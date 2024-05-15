import { createStore} from "redux";
import rootReducer from "../reducer/reducer";

const myStore = createStore(
    rootReducer,
//    applyMiddleware(...middleware)
)

export default myStore