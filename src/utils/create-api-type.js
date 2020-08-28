function createApiType(type) {
    return {
        REQUESTED: `${type}-requested`,
        RESPONSE_RECEIVED: `${type}-response-received`
    }
}


export default createApiType
