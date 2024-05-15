use std::env::current_dir;
use std::fs::create_dir_all;

use cosmwasm_schema::{export_schema, remove_schemas, schema_for};
use cw_pair_factory::state::{Config, AssetInfo, Balances, PairInfo, LiquidityPosition};
use cw_pair_factory::msg::{ExecuteMsg, InstantiateMsg, QueryMsg, PairInstantiateMsg};

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    export_schema(&schema_for!(InstantiateMsg), &out_dir);
    export_schema(&schema_for!(ExecuteMsg), &out_dir);
    export_schema(&schema_for!(QueryMsg), &out_dir);
    export_schema(&schema_for!(PairInstantiateMsg), &out_dir);
    export_schema(&schema_for!(Config), &out_dir);
    export_schema(&schema_for!(AssetInfo), &out_dir);
    export_schema(&schema_for!(Balances), &out_dir);
    export_schema(&schema_for!(PairInfo), &out_dir);
    export_schema(&schema_for!(LiquidityPosition), &out_dir);

}