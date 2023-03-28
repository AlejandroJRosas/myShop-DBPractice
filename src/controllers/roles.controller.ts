import { Request, Response } from 'express'
import pool from '../database'
import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} from '../utils/responses'
import { RolesRequestBody } from '../types/role'
import { parseName } from '../utils/parsers'
import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError'

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_BAD_REQUEST = 400
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

const validatePageAndSize = (
  page: any,
  size: any
): [number, number] | string => {
  let pageAsNumber: number
  let sizeAsNumber: number

  if (!isNaN(Number(page)) && Number.isInteger(Number(page))) {
    pageAsNumber = Number.parseInt(page)
    if (pageAsNumber < 1) {
      pageAsNumber = 1
    }
  } else {
    return 'La página debe ser un número entero'
  }

  if (!isNaN(Number(size)) && Number.isInteger(Number(size))) {
    sizeAsNumber = Number.parseInt(size)
    if (sizeAsNumber < 1) {
      sizeAsNumber = 1
    }
  } else {
    return 'La tamaño debe ser un número entero'
  }

  return [pageAsNumber, sizeAsNumber]
}

export const getRoles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query
  const validatedParams = validatePageAndSize(page, size)

  try {
    if (typeof validatedParams === 'string') {
      throw new StatusError(validatedParams, STATUS_BAD_REQUEST)
    }

    const [pageAsNumber, sizeAsNumber] = validatedParams

    let offset = (pageAsNumber - 1) * sizeAsNumber

    if (pageAsNumber < 1) {
      offset = 0
    }

    const [rows] = await pool.query('SELECT * FROM roles')
    if (rows.length === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const [result] = await pool.query('SELECT * FROM roles LIMIT ?, ?', [
      offset,
      sizeAsNumber
    ])
    const pagination: PaginateSettings = {
      total: rows.length,
      currentPage: pageAsNumber,
      perPage: sizeAsNumber
    }
    return paginatedItemsResponse(res, STATUS_OK, result, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getRoleById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM roles WHERE id = ?',
      req.params.roomId
    )
    if (rows.length === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.roomId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getRoleDataFromRequestBody = (requestBody: any): RolesRequestBody => {
  const newRoom: RolesRequestBody = {
    name: parseName(requestBody.name)
  }
  return newRoom
}

export const addRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newRole = getRoleDataFromRequestBody(req.body)

    const [rows] = await pool.query('INSERT INTO roles SET ?', newRole)
    const insertedId: string = rows.insertId
    const [roleItem] = await pool.query(
      `SELECT * FROM roles WHERE id = ${insertedId}`
    )
    return successItemsResponse(res, STATUS_CREATED, roleItem[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedRole = getRoleDataFromRequestBody(req.body)
    const [rows] = await pool.query('UPDATE roles SET ? WHERE id = ?', [
      updatedRole,
      req.params.roomId
    ])
    if (rows.affectedRows === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.roomId}`,
        STATUS_NOT_FOUND
      )
    }
    if (rows.changedRows === 0) {
      return successResponse(
        res,
        STATUS_OK,
        'Operación PUT exitosa pero el contenido del registro no cambió'
      )
    }
    return successResponse(res, STATUS_OK, 'Rol modificado exitosamente')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [rows] = await pool.query(
      'DELETE FROM roles WHERE id = ?',
      req.params.roomId
    )
    if (rows.affectedRows === 0) {
      throw new StatusError(
        `No se pudo encontrar el registro de id: ${req.params.roomId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Rol eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
