use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub img_url: String,
    pub amount: u128,
    pub owner: Addr,
}

pub const TOKEN_INFO: Item<TokenInfo> = Item::new("new_token");
