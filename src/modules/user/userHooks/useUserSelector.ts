import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store/rootReducer'
import { userState, fetchUser } from '../userSlice'

/**
 * for reading only
 */
export function useUserSelector(): userState {
  return useSelector((state: RootState): userState => state.user)
}
