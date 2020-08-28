
import { combineReducers } from 'redux'
import { FETCH_ISSUE_LIST, FETCH_ISSUE_DETAILS, FETCH_ISSUE_DETAIL } from './actions'


const issueDetails = (state = {}, {type, payload, error}) => {
    if (type === FETCH_ISSUE_DETAILS.RESPONSE_RECEIVED) {
        if (error) return state
        return {...state, ...payload.response }
    }
    return state
}

const issueList = (state = {}, {type, payload, error}) => {
    if (type === FETCH_ISSUE_LIST.RESPONSE_RECEIVED) {
        if (error) return state
        let { response, page } = payload
        let newState = { ...state, ...response, [page]: response.items }
        delete newState.items
        return newState
    }
    return state
}

const issueDetail = (state = {}, {type, payload, error}) => {
    if (type === FETCH_ISSUE_DETAIL.RESPONSE_RECEIVED) {
        if (error) return state
        return {...state, ...payload.response }
    }
    return state
}

const reducer = combineReducers({
    issueDetails,
    issueList,
    issueDetail
})

export default reducer

