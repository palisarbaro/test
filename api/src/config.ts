import denv from 'dotenv'
denv.config()


export const port = process.env.PORT || '4000'

export const frontend_url = process.env.FRONTEND || ''

export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_URL = process.env.DB_URL
export const DB_NAME = process.env.DB_NAME

