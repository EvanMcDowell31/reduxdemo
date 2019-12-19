import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store/configureStore'

export interface userData {
  merchantId: string
}

export type userState = {
  loading: boolean
  error: string | null
  data: userData | {}
}

export const userInitialState: userState = {
  loading: false,
  error: null,
  data: {}
}

/**
 * generating:
 *  - actions
 *  - action creators
 *  - reducers
 */
const user = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    getUserStart(state: userState) {
      state.loading = true
    },
    getUserSuccess(state: userState, { payload }: PayloadAction<userData>) {
      state.loading = false
      state.error = null
      state.data = payload
    },
    getUserFailed(state: userState, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

/**
 * actions
 */
export const { getUserStart, getUserSuccess, getUserFailed } = user.actions

/**
 * slice reducer
 */
export default user.reducer

/**
 * service | data fetcher
 */
export function fetchUserData(): Promise<userData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ merchantId: '1' })
    }, 1000)
  })
}

/**
 * Thunks
 */
export const fetchUser = (): AppThunk => async dispatch => {
  dispatch(getUserStart())
  fetchUserData().then(
    res => dispatch(getUserSuccess(res)),
    err => dispatch(getUserFailed(err.toString()))
  )
}
