export interface Product {
  id?: number
  name: string
  unitPrice: number
  unitsOnStock: number
  categoryId?: number
  createdAt?: Date
  updatedAt?: Date
}
