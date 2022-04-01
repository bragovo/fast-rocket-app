import { getClient } from '@tauri-apps/api/http'
import { useEffect, useState } from 'react'

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID, SNOWPACK_PUBLIC_API_PATH: API_PATH } = import.meta.env
const { SNOWPACK_PUBLIC_AUTH_TOKEN: AUTH_TOKEN, SNOWPACK_PUBLIC_USER_ID: USER_ID } = import.meta.env

export const getRequest = async <T>(endpoint: string, query: Record<string, any>) => {
  const client = getClient()

  const { data } = await (await client).get<T>(
    `${SPACE_ID}${API_PATH}${endpoint}`,
    {
      query,
      headers: {
        "X-Auth-Token": AUTH_TOKEN,
        "X-User-Id": USER_ID
      }
    }
  )

  return data
}
