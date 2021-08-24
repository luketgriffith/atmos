import { API } from './api'

export const getAllData = () => {
	return (dispatch) => {
    try {
      const homes = API.getHomePlans()
      const lots = API.getLots()
      const combinations = API.getCombinations()
      dispatch({ type: 'SET_HOMES', payload: homes })
      dispatch({ type: 'SET_LOTS', payload: lots })
      dispatch({ type: 'SET_COMBINATIONS', payload: combinations })
    } catch(e) {
      dispatch({ type: 'FETCH_HOMES_ERROR', payload: e?.message || 'Error fetching homes' })
    }
	}
}

export const setIsFavorite = (entity) => {
	return (dispatch) => {
    if (entity.homePlanId) {
      dispatch({ type: 'SET_FAVORITE_HOME', payload: entity.homePlanId })
    } else {
      dispatch({ type: 'SET_FAVORITE_LOT', payload: entity.lotId })
    }
	}
}
