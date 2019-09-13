import {SET_DATA} from "../_actions/setData";

export default function dataReducer(state = [], action = {}) {
    switch (action.type) {
        case SET_DATA:
            return {
                usData: action.usData
            };
        default: return state;
    }
}