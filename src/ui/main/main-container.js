import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectClass } from '../../utils'
import IssuesContainer from '../project/issues-container'
import IssuesDetailContainer from '../project/issues-detail-container'


class MainContainer extends React.Component {
    render() {
        return (
            <div className="MainContainer">
               <div className="ContentBox">
                    <Switch>
                        <Redirect exact from='/' to='/issues' />
                        <Route exact path='/issues' component={IssuesContainer} />
                        <Route exact path='/issues/:issueId' component={IssuesDetailContainer} />
                        <Route render={() => <div><h1>404 Not Found</h1></div>} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ConnectClass(MainContainer)
