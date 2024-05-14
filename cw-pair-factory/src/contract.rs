use crate::msg::{ExecuteMsg, InstantiateMsg, PairInstantiateMsg, QueryMsg};
use crate::state::{
    AssetInfo, Balances, Config, LiquidityPosition, PairInfo, BALANCES, CONFIG,
    LIQUIDITY_POSITIONS, PAIR_INFO,
};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::Addr;
use cosmwasm_std::{
    to_binary, Binary, CosmosMsg, Decimal, Deps, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult, SubMsg, Uint128, WasmMsg,
};
use cw20::Cw20ExecuteMsg;
use cw20_base::ContractError;
use std::collections::HashMap;
use std::result::Result;
const INSTANTIATE_REPLY_ID: u64 = 1;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let canonical_addr = deps.api.addr_canonicalize(info.sender.as_str())?;
    let human_addr = deps.api.addr_humanize(&canonical_addr)?;
    let config = Config {
        owner: human_addr,
        pair_code_id: msg.pair_code_id,
    };

    // Initialize Balances with values from msg
    let balances = Balances {
        token1: Uint128::zero(), // Initialize with zero balance
        token1_address: Addr::unchecked(msg.token1.clone()), // Convert the String to Addr
        token2: Uint128::zero(), // Initialize with zero balance
        token2_address: Addr::unchecked(msg.token2.clone()), // Convert the String to Addr
    };

    let pair_info = PairInfo {
        token1: msg.token1.clone(),
        token2: msg.token2.clone(),
    };

    // Initialize LiquidityPositions with values from msg
    let mut liquidity_positions: HashMap<Addr, Vec<LiquidityPosition>> = HashMap::new();
    liquidity_positions.insert(info.sender.clone(), msg.initial_liquidity_positions.clone());

    // Save LiquidityPositions into the storage
    for (addr, positions) in liquidity_positions {
        let canonical_addr = deps.api.addr_canonicalize(addr.as_str())?;
        LIQUIDITY_POSITIONS.save(deps.storage, canonical_addr.as_slice(), &positions)?;
    }
    CONFIG.save(deps.storage, &config)?;
    PAIR_INFO.save(deps.storage, &pair_info)?;
    BALANCES.save(deps.storage, &balances)?; // Save Balances into the storage

    Ok(Response::new())
}

pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CreatePair {
            asset_infos,
            pair_admin,
        } => execute_create_pair(deps, env, info, asset_infos, pair_admin),
        ExecuteMsg::AddLiquidity {
            lower,
            upper,
            amount,
        } => execute_add_liquidity(deps, env, info, lower, upper, amount),
        ExecuteMsg::Swap {
            offer_asset,
            min_return,
        } => execute_swap(deps, env, info, offer_asset, min_return),
    }
}


#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute_add_liquidity(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    lower_price: Decimal,
    upper_price: Decimal,
    amount: Uint128,
) -> Result<Response, ContractError> {
    // load the pair info from state
    let pair_info: PairInfo = PAIR_INFO.load(deps.storage)?;
    // load the current balances from state
    let mut balances: Balances = BALANCES.load(deps.storage)?;

    // transfer the specified amount of each token from the sender to the contract
    let transfer_msg1 = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: pair_info.token1.clone(),
        msg: to_binary(&Cw20ExecuteMsg::TransferFrom {
            owner: info.sender.to_string(),
            recipient: env.contract.address.to_string(),
            amount: amount,
        })?,
        funds: vec![],
    });

    let transfer_msg2 = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: pair_info.token2.clone(),
        msg: to_binary(&Cw20ExecuteMsg::TransferFrom {
            owner: info.sender.to_string(),
            recipient: env.contract.address.to_string(),
            amount,
        })?,
        funds: vec![],
    });
    // update balances
    balances.token1 += amount;
    balances.token2 += amount;

    // Create a new position
    let position = LiquidityPosition {
        owner: info.sender.clone(),
        lower_price,
        upper_price,
        liquidity: amount,
    };
    // Load existing positions from storage
    // Load existing positions from storage
    let mut positions = LIQUIDITY_POSITIONS
        .load(
            deps.storage,
            &deps.api.addr_canonicalize(info.sender.as_str())?.as_slice(),
        )
        .unwrap_or_else(|_| vec![]);

    // Add the new position to the positions
    positions.push(position);

    BALANCES.save(deps.storage, &balances)?;
    PAIR_INFO.save(deps.storage, &pair_info)?;
    LIQUIDITY_POSITIONS.save(
        deps.storage,
        &deps.api.addr_canonicalize(info.sender.as_str())?.as_slice(),
        &positions,
    )?;
    // let sender_addr = deps.api.addr_canonicalize(info.sender.as_str())?;

    Ok(Response::new()
        .add_message(transfer_msg1)
        .add_message(transfer_msg2))
}

pub fn execute_swap(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    offer_asset: AssetInfo,
    min_return: Uint128,
) -> Result<Response, ContractError> {
    let pair_info: PairInfo = PAIR_INFO.load(deps.storage)?;

    // Load the current balances from state
    let mut balances: Balances = BALANCES.load(deps.storage)?;
    // Print the current balances
    // println!("Current balances: {:?}", balances);
    // println!("Loading key: {:?}", info.sender.as_bytes());
    // Load the liquidity positions from state
    let positions: Vec<LiquidityPosition> =
        LIQUIDITY_POSITIONS.load(deps.storage, info.sender.as_bytes())?;

    // println!("Offered asset: {:?}", offer_asset);
    // Calculate the price of the swap
    let swap_price = calculate_price(&offer_asset, &balances);
    println!("Swap price: {:?}", swap_price);

    // filter the positions based on the price range
    let mut filtered_positions = Vec::new();
    for p in &positions {
        if swap_price >= p.lower_price && swap_price <= p.upper_price {
            filtered_positions.push(p.clone());
        }
    }

    // Calculate the return amount
    let return_amount = calculate_return_amount(offer_asset.amount, &balances);
    println!("Return amount: {:?}", return_amount);
    // If the calculated return amount is less than min_return, revert the transaction
    // parameter that a trader can set to specify the minimum amount of tokens they are willing to receive in return for a trade
    if return_amount < min_return {
        return Err(ContractError::Std(StdError::generic_err(
            "Insufficient funds for swap",
        )));
    }

    // Transfer the offer_asset from the sender to the contract
    let transfer_msg = CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: offer_asset.token.to_string(),
        msg: to_binary(&Cw20ExecuteMsg::TransferFrom {
            owner: info.sender.to_string(),
            recipient: env.contract.address.to_string(),
            amount: offer_asset.amount,
        })?,
        funds: vec![],
    });

    // Update balances
    balances.token1 += offer_asset.amount;
    balances.token2 -= return_amount;

    // Save the updated balances to state
    BALANCES.save(deps.storage, &balances)?;

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_attributes(vec![
            ("action", "swap"),
            ("offer_asset", offer_asset.token.as_str()),
            ("return_amount", &return_amount.to_string()),
        ]))
}

fn calculate_price(offer_asset: &AssetInfo, balances: &Balances) -> Decimal {
    println!("Calculating price for asset: {:?}", offer_asset);
    // Get the balance of the offered asset
let offer_balance = if offer_asset.token == balances.token1_address {
    // println!("Offered asset matches token1_address");
    balances.token1
} else if offer_asset.token == balances.token2_address {
    // println!("Offered asset matches token2_address");
    balances.token2
} else {
    // println!("Offered asset: {:?}", offer_asset.token);
    // println!("Token1 address: {:?}", balances.token1_address);
    // println!("Token2 address: {:?}", balances.token2_address);
    panic!("Offered asset is not in the pool");
};

    // Calculate the price as the ratio of the offered amount to the balance of the offered asset
    Decimal::from_ratio(offer_asset.amount, offer_balance)
}
// calculates the amount of the other token to return (new_token_out_pool) based on the offered amount (offer_amount) and the current pool balances (balances)
fn calculate_return_amount(offer_amount: Uint128, balances: &Balances) -> Uint128 {
    println!("Calculating return amount for amount: {:?}", offer_amount);
    let token_in_pool = balances.token1.u128();
    let token_out_pool = balances.token2.u128();
    println!("Token in pool: {:?}", token_in_pool);
    println!("Token out pool: {:?}", token_out_pool);
    let invariant = token_in_pool * token_out_pool;
    let new_token_in_pool = token_in_pool + offer_amount.u128();
    let new_token_out_pool = invariant / new_token_in_pool;
    println!("New token in pool: {:?}", new_token_in_pool);
    println!("New token out pool: {:?}", new_token_out_pool);
    if new_token_out_pool > token_out_pool {
        Uint128::zero() // not enough liquidity.
    } else {
        Uint128::from(token_out_pool - new_token_out_pool)
    }
}

// create_pair instantiates a new pair contract with the given asset infos
pub fn execute_create_pair(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    asset_infos: [AssetInfo; 2],
    pair_admin: Option<String>,
) -> Result<Response, ContractError> {
    let config: Config = CONFIG.load(deps.storage)?;
    let pair_admin = pair_admin.unwrap_or(env.contract.address.to_string());

    Ok(Response::new()
        .add_submessage(SubMsg::reply_on_success(
            WasmMsg::Instantiate {
                code_id: config.pair_code_id,
                funds: vec![],
                admin: Some(pair_admin.clone()),
                label: "pair".to_string(),
                msg: to_binary(&PairInstantiateMsg {
                    asset_infos: asset_infos.clone(),
                    admin: Some(deps.api.addr_validate(&pair_admin)?.to_string()),
                })?,
            },
            INSTANTIATE_REPLY_ID,
        ))
        .add_attributes(vec![
            ("action", "create_pair"),
            (
                "pair",
                &format!("{:?}-{:?}", asset_infos[0], asset_infos[1]),
            ),
        ]))
}

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use super::*;
    use crate::state::LiquidityPosition;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, Api, Uint128};

    #[test]
    fn test_execute_swap() {
        let mut deps = mock_dependencies();

        let msg = InstantiateMsg {
            pair_code_id: 1u64,
            token1: "token1".to_string(),
            token2: "token2".to_string(),
            token1_address: "token1_address".to_string(),
            token2_address: "token2_address".to_string(),
            initial_liquidity_positions: vec![],
        };
        let info = mock_info("creator", &coins(2, "token"));

        // we can just .unwrap() to assert this was a success
        let _res = instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

        let env = mock_env();
        let add_liquidity_info = mock_info("sender", &[]);

        // add liquidity to the pool
        let add_liquidity_msg = ExecuteMsg::AddLiquidity {
            lower: Decimal::percent(90),
            upper: Decimal::percent(110),
            amount: Uint128::from(200u64),
        };
        // Create a mock info
        let info = mock_info("sender", &[]);

        // Call the execute function with the message
        let result = execute(
            deps.as_mut(),
            env.clone(),
            add_liquidity_info,
            add_liquidity_msg,
        );

        let pair_info = PairInfo {
            token1: "token1_address".to_string(),
            token2: "token2_address".to_string(),
        };
        PAIR_INFO.save(&mut deps.storage, &pair_info).unwrap();
        let initial_balances = Balances {
            token1: Uint128::from(200u64),
            token2: Uint128::from(200u64),
            token1_address: Addr::unchecked("token1_address"),
            token2_address: Addr::unchecked("token2_address"),
        };
        BALANCES.save(&mut deps.storage, &initial_balances).unwrap();

        // Check if the liquidity was added correctly
        let balances: Balances = BALANCES.load(deps.as_ref().storage).unwrap();
        assert_eq!(balances.token1, Uint128::from(200u64));
        assert_eq!(balances.token2, Uint128::from(200u64));
        let liquidity_positions = vec![
            LiquidityPosition {
                liquidity: Uint128::from(100u128),
                lower_price: Decimal::from_str("1.0").unwrap(),
                owner: Addr::unchecked("orai1ju8t33cxjfazk2f2vjuzv2ne5y4j0kqhtuuqtu"),
                upper_price: Decimal::from_str("2.0").unwrap(),
            },
            // add more LiquidityPosition if needed
        ];
        let sender_canonical = deps.api.addr_canonicalize(&info.sender.as_str()).unwrap();
        println!("Saving key: {:?}", info.sender.as_bytes());
        LIQUIDITY_POSITIONS
            .save(
                &mut deps.storage,
                info.sender.as_bytes(),
                &liquidity_positions,
            )
            .unwrap();
        let offer_asset = AssetInfo {
            token: Addr::unchecked("token1_address"),
            decimals: 8,
            amount: Uint128::from(200u128),
        };
        println!("Offered asset: {:?}", offer_asset.token);
        let min_return = Uint128::from(50u128);
        // Call the function
        let result = execute_swap(
            deps.as_mut(),
            env.clone(),
            info.clone(),
            offer_asset.clone(),
            min_return.clone(),
        );

        // Assert the expected result
        match result {
            Ok(response) => {
                // Check the messages and attributes in the response
                assert_eq!(response.messages.len(), 1);
                assert_eq!(response.attributes.len(), 3);
                // Add more assertions as needed
            }
            Err(e) => panic!("Unexpected error: {:?}", e),
        }
        // Check the updated state
        let updated_balances = BALANCES.load(&deps.storage).unwrap();
        assert_eq!(updated_balances.token1, Uint128::from(400u64));
        assert_eq!(updated_balances.token2, Uint128::from(100u64));
    }
    #[test]
    fn test_instantiate_and_create_pair() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        let info = mock_info("creator", &coins(2, "token"));

        // Instantiate the contract
        let instantiate_msg = InstantiateMsg {
            pair_code_id: 1,
            token1: "token1".to_string(),
            token2: "token2".to_string(),
            token1_address: "token1_address".to_string(),
            token2_address: "token2_address".to_string(),
            initial_liquidity_positions: vec![
                LiquidityPosition {
                    liquidity: Uint128::from(100u128),
                    lower_price: Decimal::from_str("1.0").unwrap(),
                    owner: Addr::unchecked("orai1ju8t33cxjfazk2f2vjuzv2ne5y4j0kqhtuuqtu"),
                    upper_price: Decimal::from_str("2.0").unwrap(),
                },
                // add more LiquidityPosition if needed
            ],
        };
        let _res = instantiate(deps.as_mut(), env.clone(), info.clone(), instantiate_msg).unwrap();

        // test execute_create_pair
        let asset_infos = [
            AssetInfo {
                token: Addr::unchecked("orai1ju8t33cxjfazk2f2vjuzv2ne5y4j0kqhtuuqtu"),
                decimals: 8,
                amount: Uint128::from(1000u128),
            },
            AssetInfo {
                token: Addr::unchecked("orai1ju8t33cxjfazk2f2vjuzv2ne5y4j0kqhtuuqtu"),
                decimals: 8,
                amount: Uint128::from(2000u128),
            },
        ];
        let cw20_token_address = asset_infos[0].token.clone();
        let native_token_address = asset_infos[1].token.clone();
        let res = execute_create_pair(deps.as_mut(), env.clone(), info.clone(), asset_infos, None)
            .unwrap();
        // Save the pair info and balances to the state
        PAIR_INFO
            .save(
                &mut deps.storage,
                &PairInfo {
                    token1: cw20_token_address.clone().to_string(),
                    token2: native_token_address.clone().to_string(), // clone before storing
                },
            )
            .unwrap();
        BALANCES
            .save(
                &mut deps.storage,
                &Balances {
                    token1: Uint128::zero(),
                    token1_address: cw20_token_address.clone(),
                    token2: Uint128::zero(),
                    token2_address: native_token_address.clone(), // clone before storing
                },
            )
            .unwrap();
        // Query the saved pair info and balances
        let saved_pair_info: PairInfo = PAIR_INFO.load(&deps.storage).unwrap();
        let saved_balances: Balances = BALANCES.load(&deps.storage).unwrap();

        // Check if the saved pair info and balances match the expected values
        let cw20_token_address_clone = cw20_token_address.clone();
        assert_eq!(saved_pair_info.token1, cw20_token_address_clone.to_string());
        assert_eq!(saved_pair_info.token2, native_token_address.to_string());
        assert_eq!(saved_balances.token1, Uint128::zero());
        assert_eq!(saved_balances.token1_address, cw20_token_address);
        assert_eq!(saved_balances.token2, Uint128::zero());
        assert_eq!(saved_balances.token2_address, native_token_address);
    }
    #[test]
    fn add_liquidity() {
        let mut deps = mock_dependencies();

        let msg = InstantiateMsg {
            pair_code_id: 1u64,
            token1: "token1".to_string(),
            token2: "token2".to_string(),
            token1_address: "token1_address".to_string(),
            token2_address: "token2_address".to_string(),
            initial_liquidity_positions: vec![],
        };
        let info = mock_info("creator", &coins(2, "token"));

        // we can just .unwrap() to assert this was a success
        let _res = instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

        // Prepare add liquidity message
        let add_liquidity_msg = ExecuteMsg::AddLiquidity {
            lower: Decimal::percent(90),
            upper: Decimal::percent(110),
            amount: Uint128::from(200u64),
        };

        // Execute add liquidity
        let res = execute(deps.as_mut(), mock_env(), info, add_liquidity_msg).unwrap();

        // Check if the liquidity was added correctly
        let balances: Balances = BALANCES.load(deps.as_ref().storage).unwrap();
        assert_eq!(balances.token1, Uint128::from(200u64));
        assert_eq!(balances.token2, Uint128::from(200u64));

        // Check if the liquidity position was created correctly
        let canonical_addr = deps.api.addr_canonicalize("creator").unwrap();
        let positions: Vec<LiquidityPosition> = LIQUIDITY_POSITIONS
            .load(deps.as_ref().storage, canonical_addr.as_slice())
            .unwrap_or_else(|_| vec![]);

        assert_eq!(positions[0].liquidity, Uint128::from(200u64));
    }
}
