import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'
import { initialState } from '../../modules/outbound/outboundSlice'

const middleware = [...getDefaultMiddleware()]

const preloadedState = {
  oubound: initialState
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware
})

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./reducers', () => {
//     const newRootReducer = require('./rreducers').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
