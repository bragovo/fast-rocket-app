import React, { FC, useState } from "react"
import { getClient } from "@tauri-apps/api/http";

import s from './index.module.css'
import { LoginData } from "./models";
import { useNavigate } from "react-router-dom";
import { useRootContext } from "app/context";

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID, SNOWPACK_PUBLIC_API_PATH: API_PATH } = import.meta.env

// TODO: Rewrite this component
export const AddWorkspace: FC = () => {
  const rootStore = useRootContext()
  const navigation = useNavigate()
  const client = getClient()
  const [user, setUser] = useState('qad')
  const [password, setPassword] = useState('!234Qwer')
  const [totp, setTotp] = useState(false)
  const [code, setCode] = useState('')

  const handleLoginClick = async () => {
    const { data, status } = await (await client).post<LoginData>(
      `${SPACE_ID}${API_PATH}/login`,
      {
        type: 'Json',
        payload: {
          user, password
        }
      }
    )

    if (data.status === "error" && data.error === 'totp-required') {
      setTotp(true)
    } else if (data.status === "success" && data.data) {
      await rootStore.login(data.data.userId, data.data.authToken)
      // navigation("/workspace")
    }
  }

  const handleTotpClick = async () => {
    const { data, status } = await (await client).post<LoginData>(
      `${SPACE_ID}${API_PATH}/login`,
      {
        type: 'Json',
        payload: {
          user, password, code
        }
      }
    )

    if (data.status === "success" && data.data) {
      await rootStore.login(data.data.userId, data.data.authToken)
      // navigation("/workspace")
    }
  }

  return (
    <div className={s.root}>
      <div className={s.workspace}>
        <div className={s.form}>
          <input className={s.in} type="text" value={user} placeholder="Enter user.." onChange={({ target: { value } }) => setUser(value.replace(/\s+/g,' ').trim())} />
          <input className={s.in} type="text" value={password} placeholder="Enter password.." onChange={({ target: { value } }) => setPassword(value.replace(/\s+/g,' ').trim())} />

          {totp &&
            <>
              <input className={s.in} type="text" value={code} placeholder="Enter auth code.." onChange={({ target: { value } }) => setCode(value.replace(/\s+/g,' ').trim())} />

              <button
                className={s.button}
                type="button"
                disabled={user === '' || password === '' || (totp && code === '')}
                onClick={handleTotpClick}
              >
                Login
              </button>
            </>
          }

          {!totp &&
            <button
              className={s.button}
              type="button"
              disabled={user === '' || password === ''}
              onClick={handleLoginClick}
            >
              Login
            </button>
          }
        </div>
      </div>
    </div>
  )
}