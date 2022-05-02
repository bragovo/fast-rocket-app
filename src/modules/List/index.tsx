import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { NavLink } from "react-router-dom"
import { useRootContext } from "app/context"
import cc from "classcat"

import s from "./index.module.css"

export const List: FC = observer(() => {
  const rootStore = useRootContext()
  const { roomsStore, space, threadsStore } = rootStore

  return (
    <div className={s.root}>
      {roomsStore.displayRooms.map((roomStore) => (
        <div className={s.item} key={roomStore._id}>
          <NavLink
            to={`/workspace/rooms/${roomStore._id}${threadsStore.tmid !== false ? `/${threadsStore.tmid}` : ""}`}
            className={({ isActive }) => cc([s.link, { [s.active]: isActive }])}
          >
            {roomStore.symbol} {roomStore.name}
            <div className={cc([s.alert, { [s.active]: roomStore.isAlert }])} />
          </NavLink>
        </div>
      ))}

      {space !== false && (
        <NavLink to="/account" className={s.account}>
          <div className={s.avatar}>
            <img src={space.meStore.avatarUrl} />
          </div>
          <div>
            <div className={s.name}>{space.meStore.name}</div>
            <div className={s.status}>{space.meStore.status}</div>
          </div>
        </NavLink>
      )}
    </div>
  )
})
