import { combineReducers } from '@reduxjs/toolkit'

import ouboundReducer from '../../modules/outbound/outboundSlice'
import userReducer from '../../modules/user/userSlice'

const rootReducer = combineReducers({
  outbound: ouboundReducer,
  user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
