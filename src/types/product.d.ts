export interface Product {
  id?: number
  name: string
  unitPrice: number
  unitsOnStock: number
  category?: string
  createdAt?: Date
  updatedAt?: Date
}
