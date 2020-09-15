import { createSelector } from 'reselect'

const getState = state => state.starWars

const getStarWarsData = createSelector(getState, state => state.starWarsData)
const getStarWarsDataByType = createSelector(getStarWarsData, data => (type, id) => {
    if (type && id) return data[type][id]
    return data[type]
})


export {
    getStarWarsDataByType
}
