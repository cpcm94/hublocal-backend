import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  postgresHost: process.env.POSTGRES_HOST,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  port: process.env.PORT || 3000,
}
