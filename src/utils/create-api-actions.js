import { createAction } from 'redux-actions'

function createApiActions(type) {
    return {
        requested: createAction(type.REQUESTED),
        responseReceived: createAction(type.RESPONSE_RECEIVED)
    }
}


export default createApiActions
