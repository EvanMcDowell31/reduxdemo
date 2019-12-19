import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store/rootReducer'
import { userState, fetchUser } from './userSlice'

export function useUser() {
  const dispatch = useDispatch()
  const userSlice = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return [userSlice, dispatch]
}
