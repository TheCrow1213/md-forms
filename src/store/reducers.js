import { combineReducers } from 'redux'

import user from './user/reducer'

export const makeRootReducer = () => {
  return combineReducers({ user })
}

export default makeRootReducer
