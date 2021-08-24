const initialState = []

const homes = (state = initialState, action) => {
	switch (action.type) {
    case 'SET_HOMES': {
      return [...action.payload]
    }
    case 'SET_FAVORITE_HOME': {
      return state.map(home => {
        return {
          ...home,
          favorite: home.homePlanId === action.payload ? !home.favorite : home.favorite
        }
      })
    }
		default:
			return state
	}
}

export default homes
