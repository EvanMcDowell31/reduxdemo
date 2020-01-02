import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingSpinner from '../../../../library/components/loadingSpinner'
import { fetchOutboundOrders } from '../../outboundSlice'
import { RootState } from '../../../../app/store/rootReducer'
import { useUserSelector } from '../../../user/userHooks/useUserSelector'

export const OutboundPage = () => {
  const dispatch = useDispatch()

  const { ordersById, allOrderIds, loading, error, pageCount } = useSelector(
    (state: RootState) => state.outbound
  )

  const user = useUserSelector()

  const orders = allOrderIds.map(orderId => ordersById[orderId])

  useEffect(() => {
    dispatch(fetchOutboundOrders())
  }, [dispatch])

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error.toString()}</div>
      </div>
    )
  }

  return loading && user.loading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <div>
      <h1>{user.data.merchantId}</h1>
      <ul>
        {orders.map(({ orderId, status }) => {
          return (
            <li key={orderId}>
              <span>#{orderId}</span>
              <span>Status = {status}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
