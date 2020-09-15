import React from 'react'
import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import './dashboard-card.css'


const CardContainer = styled.div`
    margin: 10px;
    :hover {
        cursor: pointer;
    }

`
const CardTitle = styled.div`
    .CardTitle {
        padding: 0 10px;
        width: fit-content;
        float: left;
    }
`
const CardFooter = styled.div`
    color: grey;
`
const typeMap = {
    films: {
        header: 'title',
        footer: 'director'
    },
    people: {
        header: 'name',
        footer: 'birth_year'
    },
    planets: {
        header: 'name',
        footer: 'terrain'
    },
    species: {
        header: 'name',
        footer: 'language'
    },
    vehicles: {
        header: 'name',
        footer: 'model'
    },
    starships: {
        header: 'name',
        footer: 'model'
    }
}
const DashboardCard = ({ type, data, onClick }) => {
    const header = typeMap[type]['header']
    const footer = typeMap[type]['footer']

    return (
        <CardContainer onClick={onClick}>
            <Card variant="outlined">
                <CardContent  className="DashboardCard">
                    <CardTitle>
                        {data[header]}
                    </CardTitle>
                    <CardFooter>
                        {data[footer]}
                    </CardFooter>
                </CardContent>
            </Card>
        </CardContainer>
    )
}

export default DashboardCard
