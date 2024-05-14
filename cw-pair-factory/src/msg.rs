use cosmwasm_std::{Addr, Decimal, Deps, Uint128};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use crate::state::{AssetInfo, LiquidityPosition};


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct InstantiateMsg {
    pub pair_code_id: u64,
    pub token1: String,
    pub token2: String,
    pub token1_address: String,
    pub token2_address: String,
    pub initial_liquidity_positions: Vec<LiquidityPosition>,
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    CreatePair {
        asset_infos: [AssetInfo; 2],
        pair_admin: Option<String>,
    },
    AddLiquidity {
        lower: Decimal,
        upper: Decimal,
        amount: Uint128,
    },
    Swap {
        offer_asset: AssetInfo,
        min_return: Uint128,
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    // Define your query messages here
    LiquidityPosition {
        owner: Addr,
    },
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum MigrateMsg {
    // Define your migrate messages here
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct PairInstantiateMsg {
    pub asset_infos: [AssetInfo; 2],
    pub admin: Option<String>,
}
