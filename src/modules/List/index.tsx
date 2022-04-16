import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRootContext } from "app/context";
import cc from 'classcat'

import s from './index.module.css';

export const List: FC = observer(() => {
  const rootStore = useRootContext()
  const location = useLocation()
  const { roomsStore } = rootStore

  const handleLogoutClick = (): void => {
    void rootStore.logout()
  }

  return (
    <div className={s.root}>
      {roomsStore.displayRooms.map(roomStore =>
        <div className={s.item} key={roomStore._id}>
          <NavLink to={`/workspace/rooms/${roomStore._id}`} className={({ isActive }) => cc([s.link, { [s.active]: isActive }])}>
            {roomStore.symbol} {roomStore.name}
          </NavLink>
        </div>
      )}

      <div className={s.logout}>
        <button type="button" onClick={handleLogoutClick}>Logout</button>
      </div>

      <div>
        {location.pathname}
      </div>
    </div>
  )
})
