export interface User {
  id?: number
  name: string
  email: string
  password: string
  cash: number
  roleId?: number
  createdAt?: Date
  updatedAt?: Date
}
