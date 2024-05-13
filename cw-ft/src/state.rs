use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Uint128};
use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub img_url: String,
    pub amount: u128,
    pub price: u128,
    pub owner: Addr,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub owner: Addr,
}
// #[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
// pub struct ContractState {
//     pub total_supply: Uint128,
// }
pub const STATE: Item<State> = Item::new("state");
pub const TOKEN_INFO: Item<TokenInfo> = Item::new("new_token");
// pub const CONTRACT_STATE: Item<ContractState> = Item::new("contract_state");
