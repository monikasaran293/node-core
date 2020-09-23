import React from 'react'
import { render, cleanup } from '@testing-library/react'
import DashboardCard from './dashboard-card'

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

const data = {
    birth_year: "112BBY",
    created: "2014-12-10T15:10:51.357000Z",
    edited: "2014-12-20T21:17:50.309000Z",
    eye_color: "yellow",
    films: ["http://swapi.dev/api/films/1/", "http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/",],
    gender: "n/a",
    hair_color: "n/a",
    height: "167",
    homeworld: "http://swapi.dev/api/planets/1/",
    mass: "75",
    name: "C-3PO",
    skin_color: "gold",
    species: ["http://swapi.dev/api/species/2/"],
    starships: [],
    url: "http://swapi.dev/api/people/2/",
    vehicles: []
}

const header = typeMap['people']['header']
const footer = typeMap['people']['footer']

afterEach(cleanup)

test('Dashboard Card render', () => {
    const { getByTestId } = render(<DashboardCard type='people' data={data} />)
    expect(getByTestId('DashboardCardId')).toBeInTheDocument()
})


test('Dashboard Header', () => {
    const { getByTestId } = render(<DashboardCard type='people' data={data} />)
    expect(getByTestId('DashboardCardHeaderId')).toHaveTextContent(data[header])
})

test('Dashboard Footer', () => {
    const { getByTestId } = render(<DashboardCard type='people' data={data} />)
    expect(getByTestId('DashboardCardFooterId')).toHaveTextContent(data[footer])
})