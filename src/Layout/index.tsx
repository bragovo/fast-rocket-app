import { useRootContext } from "app/context"
import { Thread } from "app/modules/Thread"
import { ThreadStore } from "app/stores/ThreadStore"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { List } from "../modules/List"

import './app.css'
import s from './index.module.css'

export const Layout: FC = observer(() => {
  const { threadsStore } = useRootContext()

  return (
    <div className={s.root}>
      <div className={s.list}>
        <List />
      </div>

      <div className={s.main}>
        <Outlet />
      </div>

      {threadsStore.tmid &&
        <div className={s.thread}>
          <Thread />
        </div>
      }
    </div>
  )
})
