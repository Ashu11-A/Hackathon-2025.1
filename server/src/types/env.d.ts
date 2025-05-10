export type TProcessEnv = {
  PRODUCTION: boolean
  PORT: number
  REDIS_HOST: string
  REDIS_PORT: number
  REDIS_PASSWORD: number
  DATABASE_FILE: string
  DATABASE_TYPE: string
  JWT_TOKEN: string
  JWT_EXPIRE: string
  REFRESH_TOKEN: string
  REFRESH_EXPIRE: string
  COOKIE_TOKEN: string
  FRONT_END_URL: string
  STORAGE_TYPE: string
  LOCAL_STORAGE_PATH: string
  GEMINI_SDK_TOKEN: string
  SESSION_SECRET: string
  GH_CLIENT_ID: string
  GH_CLIENT_SECRET: string
}

type Generic = Dict<string | number | boolean>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Generic, TProcessEnv {}
  }
}

export {}