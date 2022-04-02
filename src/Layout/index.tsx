import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { List } from "../modules/List"

import './app.css'
import s from './index.module.css'

export const Layout: FC = () => {
  return (
    <div className={s.root}>
      <div className={s.channels}>
        <List />
      </div>

      <div className={s.main}>
        <Outlet />
      </div>
    </div>
  )
}
