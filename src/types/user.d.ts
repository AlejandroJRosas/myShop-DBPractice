import { Role } from '../config/enums'

export interface User {
  id?: number
  role: Role
  name: string
  email: string
  password: string
  cash: number
  createdAt?: Date
  updatedAt?: Date
}
