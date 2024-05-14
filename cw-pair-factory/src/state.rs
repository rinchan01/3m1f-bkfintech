use std::{collections::HashMap, ops::Add};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Decimal, Uint128};
use cw_storage_plus::{Item, Map};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
    pub owner: Addr,
    pub pair_code_id: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct AssetInfo {
    pub token: Addr,
    pub decimals: u8,
    pub amount: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Balances {
    pub token1: Uint128,
    pub token1_address: Addr,
    pub token2: Uint128,
    pub token2_address: Addr,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct PairInfo {
    pub token1: String,
    pub token2: String,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct LiquidityPosition {
    pub owner: Addr,
    pub lower_price: Decimal,
    pub upper_price: Decimal,
    pub liquidity: Uint128,
}
pub const BALANCES: Item<Balances> = Item::new("balances");
pub const LIQUIDITY_PROVIDERS: Map<&[u8], Uint128> = Map::new("liquidity_providers");
pub const PAIR_INFO: Item<PairInfo> = Item::new("pair_info");
pub const CONFIG: Item<Config> = Item::new("state");
pub const LIQUIDITY_POSITIONS: Map<&[u8], Vec<LiquidityPosition>> = Map::new("liquidity_positions");
