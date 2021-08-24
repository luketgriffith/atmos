const initialState = []

const lots = (state = initialState, action) => {
	switch (action.type) {
    case 'SET_COMBINATIONS': {
      return [...action.payload]
    }
		default:
			return state
	}
}

export default lots
