use crate::msg::MintMsg;
use crate::state::{TokenInfo, TOKEN_INFO, State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::to_binary;
use cosmwasm_std::{
    Addr, Binary, Deps, DepsMut, Env, MessageInfo, Order, Response, StdResult
};
use crate::error::ContractError;
use cw_storage_plus::Map;
// use cw2::set_contract_version;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};

/*
const CONTRACT_NAME: &str = "crates.io:cw-contracts";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
 */

// map stores the NFTs of each address.
pub const FTS: Map<&Addr, Vec<TokenInfo>> = Map::new("fts");
// const MAX_TOTAL_SUPPLY: u128 = (1 << 63) - 1;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let token_info = TokenInfo {
        name: _msg.name,
        symbol: _msg.symbol,
        amount: _msg.amount.u128(),
        img_url: _msg.img_url,
        price: _msg.price.u128(),
        owner: _info.sender.clone(),
    };
    let state = State {
        owner: _info.sender.clone(),
    };
    STATE.save(_deps.storage, &state)?;
    TOKEN_INFO.save(_deps.storage, &token_info)?;
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match _msg {
        ExecuteMsg::Mint(mint_msg) => mint(_deps, _env, _info, mint_msg),
        // ExecuteMsg::CustomMsg { .. } => {
        //     return Err(ContractError::Unauthorized {});
        // }
    }
}

// mint a new non-fungible token
fn mint(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    mint_msg: MintMsg,
) -> Result<Response, ContractError> {
    let state = STATE.load(deps.storage)?;
    let token_info = TOKEN_INFO.load(deps.storage)?;
    // Define the maximum total supply
    // let max_total_supply = Uint128::from(MAX_TOTAL_SUPPLY);

    if info.sender != state.owner {
        return Err(ContractError::Unauthorized {});
    }
    if mint_msg.amount.u128() == 0 {
        return Err(ContractError::ZeroAmount {});
    }

    // check if the total supply would exceed the maximum after minting
    // let new_total_supply = state
    //     .total_supply
    //     .checked_add(mint_msg.amount)
    //     .map_err(|_| ContractError::SupplyOverflow)?;
    // if new_total_supply > max_total_supply {
    //     return Err(ContractError::SupplyOverflow);
    // }

    let sender = info.sender.clone();
    let ft = TokenInfo {
        name: token_info.name,
        symbol: token_info.symbol,
        amount: token_info.amount,
        price: token_info.price,
        img_url: token_info.img_url,
        owner: sender,
    };
    FTS.update(deps.storage, &info.sender, |fts| {
        match fts {
            // if the address already has some ft, add the new one
            Some(mut fts) => {
                fts.push(ft.clone());
                Ok(fts) as Result<_, ContractError>
            }
            // if the address has no ft, create a new vector with the new FT
            None => Ok(vec![ft.clone()]),
        }
    })?;

    // if minting is successful, update the total supply
    // state.total_supply += Uint128::from(ft.amount);
    // CONTRACT_STATE.save(deps.storage, &state)?;
    Ok(Response::default())
}

// look up the ft owned by a specific address
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
    match _msg {
        QueryMsg::Ft { owner } => {
            let owner_addr = Addr::unchecked(owner);
            let fts = FTS.load(_deps.storage, &owner_addr)?;
            to_binary(&fts)
        }
        QueryMsg::AllTokens {} => query_all_tokens(_deps),
    }
}

// total number of tokens that have been minted by this contract
pub fn query_all_tokens(deps: Deps) -> StdResult<Binary> {
    let tokens: StdResult<Vec<Vec<TokenInfo>>> = FTS
        .range(deps.storage, None, None, Order::Ascending)
        .map(|item| match item {
            Ok((_, v)) => Ok(v),
            Err(e) => Err(e),
        })
        .collect();
    let tokens = tokens?; // Unwrap the Result
    to_binary(&tokens)
}

// #[cfg_attr(not(feature = "library"), entry_point)]
// pub fn query_token_total_supply(deps: Deps, token_symbol: String) -> StdResult<Binary> {
//     // Load all tokens
//     let tokens: StdResult<Vec<Vec<TokenInfo>>> = FTS
//         .range(deps.storage, None, None, Order::Ascending)
//         .map(|item| match item {
//             Ok((_, v)) => Ok(v),
//             Err(e) => Err(e),
//         })
//         .collect();
//     let tokens = tokens?; // Unwrap the Result

//     // Filter tokens by symbol and sum their amounts
//     let total_supply: u128 = tokens
//         .into_iter()
//         .flatten()
//         .filter(|token| token.symbol == token_symbol)
//         .map(|token| token.amount)
//         .sum();

//     to_binary(&total_supply)
// }

#[cfg(test)]
mod tests {
    use super::*;
    use crate::contract::{execute, instantiate, query};
    use crate::msg::{InstantiateMsg, MintMsg, QueryMsg};
    use crate::state::TokenInfo;
    use cosmwasm_std::testing::mock_dependencies_with_balances;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary, Addr, Uint128};

    // unit test for mint function
    #[test]
    fn test_mint() {
        let mut deps = mock_dependencies_with_balances(&[("token", &coins(2, "token"))]);

        // Instantiate the contract
        let msg = InstantiateMsg {
            name: "My FT".to_string(),
            symbol: "MY FT".to_string(),
            // 1.23 tokens
            amount: Uint128::from(123_000_000u128),
            price: Uint128::from(0121u128),
            img_url: "https://example.com/my-ft.png".to_string(),
        };
        let info = mock_info("creator", &coins(2, "token"));

        // Call the instantiate function
        let _ = instantiate(deps.as_mut(), mock_env(), info.clone(), msg.clone()).unwrap();

        let mint_msg = MintMsg {
            name: "My FT".to_string(),
            symbol: "MY FT".to_string(),
            amount: Uint128::from(1u128),
            price: Uint128::from(0121u128),
            img_url: "https://example.com/my-ft.png".to_string(),
        };

        // Call the execute function with a Mint message
        let msg = ExecuteMsg::Mint(mint_msg);
        let _ = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Query the contract for the NFT
        let msg = QueryMsg::Ft {
            owner: "creator".to_string(),
        };
        let res: Vec<TokenInfo> =
            from_binary(&query(deps.as_ref(), mock_env(), msg).unwrap()).unwrap();

        println!("NFT: {:?}", res);
        // Check that the NFT has the expected properties
        assert_eq!(res.len(), 1);
        assert_eq!(res[0].name, "My FT");
        assert_eq!(res[0].symbol, "MY FT");
        assert_eq!(res[0].amount, 123_000_000u128);
        assert_eq!(res[0].price, 121u128);
        assert_eq!(res[0].img_url, "https://example.com/my-ft.png");
        assert_eq!(res[0].owner, Addr::unchecked("creator"));
    }

    #[test]
    fn test_query_all() {
        let mut deps = mock_dependencies();
        // Initialize some tokens in storage
        let token_info1 = TokenInfo {
            name: "My FT1".to_string(),
            symbol: "MYFT1".to_string(),
            amount: 1u128,
            price: 12u128,
            img_url: "https://example.com/my-ft.png".to_string(),
            owner: Addr::unchecked("owner1"),
        };
        let token_info2 = TokenInfo {
            name: "My FT2".to_string(),
            symbol: "MYFT2".to_string(),
            amount: 1u128,
            price: 17u128,
            img_url: "https://example.com/my-ft.png".to_string(),
            owner: Addr::unchecked("owner2"),
        };
        FTS.save(
            &mut deps.storage,
            &Addr::unchecked("owner1"),
            &vec![token_info1.clone()],
        )
        .unwrap();
        FTS.save(
            &mut deps.storage,
            &Addr::unchecked("owner2"),
            &vec![token_info2.clone()],
        )
        .unwrap();

        // Call the function
        let result = query_all_tokens(deps.as_ref()).unwrap();

        // Deserialize the result
        let tokens: Vec<Vec<TokenInfo>> = from_binary(&result).unwrap();

        // Print the result
        println!("Tokens: {:?}", tokens);

        // Assert that the result is as expected
        assert_eq!(tokens, vec![vec![token_info1], vec![token_info2]]);
    }

    // #[test]
    // fn test_query_token_total_supply() {
    //     let mut deps = mock_dependencies();

    //     // Mint some tokens
    //     let instantiate_msg = InstantiateMsg {
    //         name: "My FT".to_string(),
    //         symbol: "MYFT".to_string(),
    //         amount: Uint128::from(123_000_000u128),
    //         price: Uint128::from(0121u128),
    //         img_url: "https://example.com/my-ft.png".to_string(),
    //     };
    //     let info = mock_info("creator", &coins(2, "token"));
    //     instantiate(deps.as_mut(), mock_env(), info, instantiate_msg).unwrap();

    //     let mint_msg = MintMsg {
    //         name: "My FT".to_string(),
    //         symbol: "MYFT".to_string(),
    //         amount: Uint128::from(100u128),
    //         price: Uint128::from(0121u128),
    //         img_url: "https://example.com/my-ft.png".to_string(),
    //     };
    //     let msg = ExecuteMsg::Mint(mint_msg);
    //     let info = mock_info("minter", &coins(2, "token"));
    //     execute(deps.as_mut(), mock_env(), info, msg).unwrap();

    //     let mint_msg = MintMsg {
    //         name: "My FT".to_string(),
    //         symbol: "MYFT".to_string(),
    //         amount: Uint128::from(1u128),
    //         price: Uint128::from(200u128),
    //         img_url: "https://example.com/my-ft.png".to_string(),
    //     };
    //     let msg = ExecuteMsg::Mint(mint_msg);
    //     let info = mock_info("minter", &coins(2, "token"));
    //     execute(deps.as_mut(), mock_env(), info, msg).unwrap();

    //     // Query total supply of TOKEN1
    //     let res = query_token_total_supply(deps.as_ref(), "TOKEN1".into()).unwrap();
    //     let total_supply: u128 = from_binary(&res).unwrap();
    //     assert_eq!(total_supply, 100);

    //     // Query total supply of TOKEN2
    //     let res = query_token_total_supply(deps.as_ref(), "TOKEN2".into()).unwrap();
    //     let total_supply: u128 = from_binary(&res).unwrap();
    //     assert_eq!(total_supply, 200);
    // }

        #[test]
    fn test_unauthorized_mint() {
        let mut deps = mock_dependencies();

        let owner = Addr::unchecked("owner");
        let non_owner = Addr::unchecked("non_owner");

        let instantiate_msg = InstantiateMsg {
            name: "My FT".to_string(),
            symbol: "MYFT".to_string(),
            amount: Uint128::from(123_000_000u128),
            price: Uint128::from(0121u128),
            img_url: "https://example.com/my-ft.png".to_string(),
        };

        // Instantiate the contract
        let env = mock_env();
        let info = mock_info(owner.as_str(), &coins(2, "token"));
        instantiate(deps.as_mut(), env.clone(), info.clone(), instantiate_msg).unwrap();

        // Attempt to mint with non-owner address
        let mint_msg = MintMsg {
            name: "My FT".to_string(),
            symbol: "MYFT".to_string(),
            amount: Uint128::from(1u128),
            price: Uint128::from(0121u128),
            img_url: "https://example.com/my-ft.png".to_string(),
        };
        let info = mock_info(non_owner.as_str(), &coins(2, "token"));
        let result = mint(deps.as_mut(), env, info, mint_msg);

        // Assert that the mint function returns an Unauthorized error
        match result {
            Ok(_) => panic!("Expected error, got success"),
            Err(ContractError::Unauthorized {}) => (), // This is what we expect
            Err(_) => panic!("Unexpected error"),
        }
    }
}
