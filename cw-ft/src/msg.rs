use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::Uint128;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct InstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub amount: Uint128,
    pub price: Uint128,
    pub img_url: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Mint(MintMsg),
    // CustomMsg { val: String },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    // CustomMsg { val: String },
    Ft { owner: String },
    AllTokens {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct CustomResponse {
    val: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum MigrateMsg {}

// pass the information needed to mint a new token
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct MintMsg {
    pub name: String,
    pub symbol: String,
    pub amount: Uint128,
    pub price: Uint128,
    pub img_url: String,
}
