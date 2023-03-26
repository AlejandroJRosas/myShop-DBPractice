import pool from '../database'
import { Request, Response } from 'express'

import * as responses from '../utils/responses'
// import { Category as CategoryType } from '../types/category'

export const getCategories = async (res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories')
    if (rows.length === 0) {
      responses.errorResponse(res, 404, 'No categories exist in the database')
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

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM categories where id=${req.params.id}`
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
        'Could not find the category by id:' + req.params.id
      )
    }
  } catch (error: any) {
    responses.errorResponse(res, 400, error.message)
  }
}

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body
  const newCategory = { name }

  try {
    const [rows] = await pool.query('INSERT INTO categories SET ?', newCategory)
    const [responseItem] = await pool.query(
      `SELECT * FROM categories WHERE id=${String(rows.insertId)}`
    )
    responses.successItemResponse(
      res,
      201,
      'Category Created Succesfully',
      responseItem[0]
    )
  } catch (error: any) {
    responses.errorResponse(res, 400, error.message)
  }
}

// export const createCategory = (req: Request): CategoryType => {
//   const { name } = req.body
//   console.log(req.body)
//   const newCategory = { name }
//   console.log(newCategory)
//   return newCategory
// }

// export const uploadCategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const newCategory = createCategory(req)
//   console.log(newCategory)
//   try {
//     const [rows] = await pool.query('INSERT INTO categories SET ?', newCategory)
//     const [responseItem] = await pool.query(
//       `SELECT * FROM categories WHERE id=${String(rows.insertId)}`
//     )
//     responses.successItemResponse(
//       res,
//       201,
//       'Category Created Succesfully',
//       responseItem[0]
//     )
//   } catch (error: any) {
//     responses.errorResponse(res, 400, error.message)
//   }
// }

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await pool.query(
      `DELETE FROM categories WHERE id=${req.params.id}`
    )
    if (rows.affectedRows === 1) {
      responses.successResponse(
        res,
        200,
        'DELETE Operation Successful, Category by id:' +
          req.params.id +
          ' has been eliminated'
      )
    } else {
      responses.errorResponse(
        res,
        404,
        'The Category with id:' + req.params.id + ' was not found'
      )
    }
  } catch (error: any) {
    responses.errorResponse(res, 500, error.message)
  }
}

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const name = req.body.nam

  console.log(name)

  try {
    const [rows] = await pool.query('UPDATE categories SET ?  WHERE id = ?', [
      req.body,
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
