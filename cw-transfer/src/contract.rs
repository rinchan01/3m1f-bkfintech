#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
// use cw2::set_contract_version;

use cw20_base::ContractError;
use cw20_base::cw20::{Cw20ExecuteMsg, ExecuteMsg};

/*
const CONTRACT_NAME: &str = "crates.io:cw-transfer";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
 */

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let balances = Balances::from_storage(deps.storage);
    balances.set(env.message.sender.as_str(), msg.initial_balance)?;
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Transfer { recipient, amount } => {
            let transfer_msg = CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: env.contract.address.to_string(),
                msg: to_binary(&Cw20ExecuteMsg::Transfer {
                    recipient: recipient.to_string(),
                    amount,
                })?,
                funds: vec![],
            });

            Ok(Response::new().add_message(transfer_msg))
        }
        _ => Err(ContractError::Unauthorized {}),
        ExecuteMsg::Swap { recipient1, recipient2, amount } => {
            let transfer_msg1 = CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: env.contract.address.to_string(),
                msg: to_binary(&Cw20ExecuteMsg::Transfer {
                    recipient: recipient1.to_string(),
                    amount,
                })?,
                funds: vec![],
            });

            let transfer_msg2 = CosmosMsg::Wasm(WasmMsg::Execute {
                contract_addr: env.contract.address.to_string(),
                msg: to_binary(&Cw20ExecuteMsg::Transfer {
                    recipient: recipient2.to_string(),
                    amount,
                })?,
                funds: vec![],
            });

            Ok(Response::new().add_message(transfer_msg1).add_message(transfer_msg2))
        }
        _ => Err(ContractError::Unauthorized {}),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(
    deps: Deps,
    env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::Balance { address } => {
            let balances = Balances::from_storage(deps.storage);
            let balance = balances.may_load(address.as_str())?.unwrap_or_default();
            to_binary(&balance)
        }
    }
}
#[cfg(test)]
mod tests {}
