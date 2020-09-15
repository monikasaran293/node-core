
import { combineReducers } from 'redux'
import { FETCH_STAR_WARS_DATA } from './actions'


const starWarsData = (state = {}, {type, payload, error}) => {
    if (type === FETCH_STAR_WARS_DATA.RESPONSE_RECEIVED) {
        if (error) return state
        const { response=[], type } = payload
        const formattedData = {}
        response.map(item => formattedData[item.url] = item)
        return {...state, [type]: formattedData }
    }
    return state
}


const reducer = combineReducers({
    starWarsData
})

export default reducer

