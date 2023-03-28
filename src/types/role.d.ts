export interface Role {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type RolesRequestBody = Pick<Role, 'name'>
