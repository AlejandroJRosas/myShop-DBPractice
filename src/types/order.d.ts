export interface Order {
  id?: number
  orderPrice: number
  quantity: number
  basketId: number
  productId: number
  createdAt?: Date
  updatedAt?: Date
}
