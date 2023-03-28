import StatusError from './status-error'

export const isString = (string: string): boolean => {
  return typeof string === 'string'
}

export const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new StatusError(
      'El campo [name] es requerido y debe ser una cadena no vacía',
      400
    )
  }

  return nameFromRequest
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new StatusError(
      'El campo [date] es requerido y debe ser un valor de tipo date no vacío',
      400
    )
  }

  return dateFromRequest
}