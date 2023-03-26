import pool from '../database'
import { Request, Response } from 'express'

import * as responses from '../utils/responses'

export const getRoles = async (res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM roles')
    if (rows.length === 0) {
      responses.errorResponse(res, 404, 'No roles exist in the database')
    } else {
      if (rows.length > 1) {
        responses.successItemResponse(
          res,
          200,
          'GET Operation Successful',
          rows
        )
      } else {
        responses.successItemResponse(
          res,
          200,
          'GET Operation Successful',
          rows[0]
        )
      }
    }
  } catch (error: any) {
    responses.errorResponse(res, 400, error.message)
  }
}

export const getRoleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM roles where id=${req.params.id}`
    )
    if (rows.length === 1) {
      responses.successItemResponse(
        res,
        200,
        'GET Operation Successful',
        rows[0]
      )
    } else {
      responses.errorResponse(
        res,
        404,
        'Could not find the role by id:' + req.params.id
      )
    }
  } catch (error: any) {
    responses.errorResponse(res, 400, error.message)
  }
}

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body
  const newRole = { name }

  console.log(newRole)
  try {
    const [rows] = await pool.query('INSERT INTO roles SET ?', newRole)
    const [responseItem] = await pool.query(
      `SELECT * FROM roles WHERE id=${String(rows.insertId)}`
    )
    responses.successItemResponse(
      res,
      201,
      'Role Created Succesfully',
      responseItem[0]
    )
  } catch (error: any) {
    responses.errorResponse(res, 400, error.message)
  }
}

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await pool.query(
      `DELETE FROM roles WHERE id=${req.params.id}`
    )
    if (rows.affectedRows === 1) {
      responses.successResponse(
        res,
        200,
        'DELETE Operation Successful, Role by id:' +
          req.params.id +
          ' has been eliminated'
      )
    } else {
      responses.errorResponse(
        res,
        404,
        'The Role with id:' + req.params.id + ' was not found'
      )
    }
  } catch (error: any) {
    responses.errorResponse(res, 500, error.message)
  }
}

export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body

  try {
    const [rows] = await pool.query('UPDATE categories SET ?  WHERE id = ?', [
      { name },
      req.params.id
    ])
    if (rows.affectedRows === 1) {
      responses.successResponse(res, 200, 'UPDATED')
    } else {
      responses.errorResponse(
        res,
        404,
        'Could not find the category by id:' + req.params.id
      )
    }
  } catch (error: any) {
    responses.errorResponse(res, 400, error.message)
  }
}
