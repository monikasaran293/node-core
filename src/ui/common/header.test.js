import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Header from './Header'

afterEach(cleanup)

test('renders header', () => {
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
})

test('header text', () => {
    const { getByText } = render(<Header />)
    const linkElement = getByText(/Star Wars/i)
    expect(linkElement).toBeInTheDocument()
})
