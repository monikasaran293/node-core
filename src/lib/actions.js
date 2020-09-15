
import { CreateApiType, CreateApiActions } from '../utils'
import { StarWarsService } from './service'


// API Action Types
const FETCH_STAR_WARS_DATA = CreateApiType('fetch-star-wars-data')

// API Actions
const fetchStarWarsDataActions = CreateApiActions(FETCH_STAR_WARS_DATA)


const fetchStarWarsData = (type) => async(dispatch) => {
    dispatch(fetchStarWarsDataActions.requested())
    await StarWarsService.fetchStarWarsData(type)
    .then(response => {
        dispatch(fetchStarWarsDataActions.responseReceived({response, type}))
    })
    .catch(err => {
        console.error(err)
        dispatch(fetchStarWarsDataActions.responseReceived(err))
    })
}


export {
    FETCH_STAR_WARS_DATA,
    fetchStarWarsData,
}