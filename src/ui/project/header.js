import React from 'react'


const Header = ({ name, history }) => {

    return (
        <h3 onClick={() => history.push('/issues')}>{name}</h3>
    )
}

export default Header
