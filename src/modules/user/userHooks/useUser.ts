import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store/rootReducer'
import { userState, fetchUser } from '../userSlice'
import { AppDispatch } from '../../../app/store/configureStore'

/**
 * for reading and fetching user
 */
export function useUser(): [userState, AppDispatch] {
  const dispatch = useDispatch()
  const userSlice = useSelector((state: RootState): userState => state.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return [userSlice, dispatch]
}
