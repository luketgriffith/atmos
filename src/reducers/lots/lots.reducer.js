const initialState = []

const lots = (state = initialState, action) => {
	switch (action.type) {
    case 'SET_LOTS': {
      return [...action.payload];
    }
    case 'SET_FAVORITE_LOT': {
      return state.map(lot => {
        return {
          ...lot,
          favorite: lot.lotId === action.payload ? !lot.favorite : lot.favorite
        }
      })
    }
		default:
			return state
	}
}

export default lots
