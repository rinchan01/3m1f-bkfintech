use crate::msg::MintMsg;
use crate::state::TokenInfo;
use crate::state::TOKEN_INFO;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::to_binary;
use cosmwasm_std::{Addr, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Order};
use cw_storage_plus::Map;
// use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};

/*
const CONTRACT_NAME: &str = "crates.io:cw-contracts";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
 */

// This map stores the NFTs of each address.
pub const FTS: Map<&Addr, Vec<TokenInfo>> = Map::new("fts");

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
        owner: _info.sender,
    };
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
        ExecuteMsg::Mint(mint_msg) => mint(_deps, _env, _info),
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
) -> Result<Response, ContractError> {
    let token_info = TOKEN_INFO.load(deps.storage)?;
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
        },
        QueryMsg::AllTokens {} => query_all_tokens(_deps),
    }
}

// query all tokens
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query_all_tokens(deps: Deps) -> StdResult<Binary> {
    let tokens: StdResult<Vec<Vec<TokenInfo>>> = FTS
        .range(
            deps.storage,
            None,
            None,
            Order::Ascending,
        )
        .map(|item| match item {
            Ok((_, v)) => Ok(v),
            Err(e) => Err(e),
        })
        .collect();
    let tokens = tokens?; // Unwrap the Result
    to_binary(&tokens)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::contract::{execute, instantiate, query};
    use crate::msg::{InstantiateMsg, MintMsg, QueryMsg};
    use crate::state::TokenInfo;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary, Addr, Uint128};
    use cosmwasm_std::testing::mock_dependencies_with_balances;

    // unit test for mint function
    #[test]
    fn test_mint() {
        let mut deps = mock_dependencies_with_balances(&[("token", &coins(2, "token"))]);

        // Instantiate the contract
        let msg = InstantiateMsg {
            name: "My FT".to_string(),
            symbol: "MYFT".to_string(),
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
            symbol: "MYFT".to_string(),
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
        assert_eq!(res[0].symbol, "MYFT");
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
}
