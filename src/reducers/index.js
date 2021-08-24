import { combineReducers } from 'redux'

import combinations from './combinations/combinations.reducer'
import homes from './homes/homes.reducer'
import lots from './lots/lots.reducer'

const rootReducer = combineReducers({
  combinations,
  homes,
	lots
})

export default rootReducer
