import { observer } from "mobx-react-lite";
import React, { FC, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRootContext } from "app/context";
import cc from 'classcat'

import s from './index.module.css';

export const List: FC = observer(() => {
  const rootStore = useRootContext()
  const location = useLocation()
  const { channelsStore: { channelsList }, groupsStore: { groupsList } } = rootStore

  const list = useMemo(() => {
    return [
      ...groupsList.map(group => ({ _id: group._id, name: group.name, type: "group" })),
      ...channelsList.map(channel => ({ _id: channel._id, name: channel.name, type: "channel" })),
    ].sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
  }, [groupsList, channelsList])

  const handlePushClick = () => {
    new Notification('title', { body: 'some text' })
  }

  const handleLogoutClick = () => {
    rootStore.logout()
  }

  return (
    <div className={s.root}>
      {list.map(item =>
        <div className={s.item} key={item._id}>
          {item.type === "channel" &&
            <NavLink to={`/workspace/channels/${item._id}`} className={({ isActive }) => cc([s.link, { [s.active]: isActive }])}>
              # {item.name}
            </NavLink>
          }

          {item.type === "group" &&
            <NavLink to={`/workspace/groups/${item._id}`} className={({ isActive }) => cc([s.link, { [s.active]: isActive }])}>
              &amp; {item.name}
            </NavLink>
          }
        </div>
      )}

      <div className={s.push}>
        <button type="button" onClick={handlePushClick}>Test Pushes</button>
      </div>

      <div className={s.logout}>
        <button type="button" onClick={handleLogoutClick}>Logout</button>
      </div>

      <div>
        {location.pathname}
      </div>
    </div>
  )
})
