import React from 'react'


const Header = ({ history }) => {
    return (
        <h1 onClick={() => history.push('/star-wars')}>Star Wars</h1>
    )
}

export default Header
