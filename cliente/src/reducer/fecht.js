import { FETCH_DATA } from "../action/Fetch";


export const initialState = {
    loading: true ,
    error: false,
    data: {}
}
export const fechReducer = (state,action) =>{
    switch (action.type) {
        case FETCH_DATA.SET_DATA:
            return{
                loading: false,
                error: false,
                data: action.payload
            }

        case (FETCH_DATA.SET_ERROR):
            return {
                ...initialState,
                error: true,
                loading: false,

            }
        

        default:
            return state 

    }
}