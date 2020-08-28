import React from 'react'
import { hot } from 'react-hot-loader'

import { ConnectClass } from './utils'
import MainContainer from './ui/main/main-container'

import './App.css'

class App extends React.Component {
    render () {
        return (
                <div className="App-Container">
                    <MainContainer />
                </div>
        )
    }
}

export default hot(module)(ConnectClass(App))
