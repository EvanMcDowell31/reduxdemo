import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../../app/store/configureStore'

import {
  getOutboundOrders,
  OutbuondOrdersResult,
  OutboundOrder
} from './outboundApi'

interface OutboundState {
  ordersById: Record<string, OutboundOrder>
  allOrderIds: string[]
  loading: boolean
  error: string | null
  pageCount: number
}

export const initialState: OutboundState = {
  ordersById: {},
  allOrderIds: [],
  loading: false,
  error: null,
  pageCount: 0
}

function startLoading(state: OutboundState) {
  state.loading = true
}

function loadingFailed(state: OutboundState, action: PayloadAction<string>) {
  state.loading = false
  state.error = action.payload
}

/**
 * generating:
 *  - actions
 *  - action creators
 *  - reducers
 */
const outbound = createSlice({
  name: 'outbound',
  initialState,
  reducers: {
    getOutboundOrdersStart(state: OutboundState) {
      state.loading = true
    },
    getOutboundOrdersSuccess(
      state,
      { payload }: PayloadAction<OutbuondOrdersResult>
    ) {
      const { results, meta } = payload
      state.pageCount = meta.totalPages
      state.loading = false
      state.error = null

      results.forEach(order => {
        state.ordersById[order.orderId] = order
      })

      state.allOrderIds = results.map(order => order.orderId)
    },
    getOutboundOrdersFailed(
      state: OutboundState,
      action: PayloadAction<string>
    ) {
      state.loading = false
      state.error = action.payload
    }
  }
})

/**
 * actions
 */
export const {
  getOutboundOrdersStart,
  getOutboundOrdersSuccess,
  getOutboundOrdersFailed
} = outbound.actions

/**
 * slice reducer
 */
export default outbound.reducer

/**
 * Thunks
 */
export const fetchOutboundOrders = (): AppThunk => async dispatch => {
  dispatch(getOutboundOrdersStart())
  // @ts-ignore
  getOutboundOrders().then(
    // @ts-ignore
    res => dispatch(getOutboundOrdersSuccess(res)),
    // @ts-ignore
    err => dispatch(getOutboundOrdersFailed(err.toString()))
  )
}
