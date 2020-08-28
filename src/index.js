import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory as createHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'

import App from './App'
import reducers from './reducers' // Or wherever you keep your reducers

const setupApp = async () => {
    const history = createHistory()

    let middleware = applyMiddleware(thunk, routerMiddleware(history))

    const store = createStore(
        combineReducers({
            ...reducers,
            router: connectRouter(history),
        }),
        middleware
    )

    ReactDOM.render(
        <Provider store={store}>
            { /* ConnectedRouter will use the store from Provider automatically */ }
            <ConnectedRouter history={history}>
                <div style={{ height: "100%" }}>
                    <App />
                </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    )
}

setupApp()