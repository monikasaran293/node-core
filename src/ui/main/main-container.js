import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectClass } from '../../utils'
import StarWarsDashboard from '../dashboard/star-wars-dashboard'
import StarWarsDetailContainer from '../dashboard/star-wars-detail-container'
import './main-container.css'

class MainContainer extends React.Component {
    render() {
        return (
            <div className="MainContainer">
               <div className="ContentBox">
                    <Switch>
                        <Redirect exact from='/' to='/star-wars' />
                        <Route exact path='/star-wars' component={StarWarsDashboard} />
                        <Route exact path='/star-wars/:type/:id' component={StarWarsDetailContainer} />
                        <Route render={() => <div><h1>404 Not Found</h1></div>} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ConnectClass(MainContainer)
