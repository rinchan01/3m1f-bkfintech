
const initialState = {
    address : '_',
}

const signerReducer = (state=initialState, action) => {
    switch (action.type) {
        case "UPDATEADDRESS":
            return {
                ...state,
                address: action.addressWallet
            }
        default: 
          return state
    }
} 

export default signerReducer