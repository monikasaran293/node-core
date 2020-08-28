import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function connectClass(Class, ...args) {
    return withRouter(connect(Class.mapStateToProps, Class.mapDispatchToProps, ...args)(Class))
}

export default connectClass
