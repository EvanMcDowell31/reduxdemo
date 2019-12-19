import orders from './mockData'

export interface OutboundOrder {
  orderId: string
  merchantId: string
  referenceNumber: string
  merchantName: string
  shipmentMethod: string
  status: string
  companyName: string
  shipAddress: { validAddress: boolean; addressValidationResolved: boolean }
  purchaseOrderNumber: string | null
  totalQuantity: number
  inventoryAvailable: boolean
  outOfRegion: boolean
  acceptsOutOfRegion: boolean
  acceptsNextDayShipping: boolean
  carrierName: string | null
  facility: { id: string; name: string }
  statusHistory?: { status: string; createdAt: string }[]
  sfp: true
}

interface meta {
  currentPageSize: number
  totalResults: number
  totalPages: number
}

export interface OutbuondOrdersResult {
  request?: {
    filter: null
    paging: { size: number; offset: string | number }
    sorting: { field: string; direction: string }[]
  }
  results: OutboundOrder[]
  meta?: meta
}

export function getOutboundOrders() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const r = Math.random()
      if (r < 0.9) {
        resolve(orders)
      } else {
        reject(new Error('ERROR'))
      }
    }, 1000)
  })
}
