import { observer } from "mobx-react-lite";
import React, { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useRootContext } from "app/context";
import cc from 'classcat'

import s from './index.module.css';

export const List: FC = observer(() => {
  const { channelsStore: { channelsList }, groupsStore: { groupsList } } = useRootContext()

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

  return (
    <div className={s.root}>
      {list.map(item =>
        <div className={s.item} key={item._id}>
          {item.type === "channel" &&
            <NavLink to={`/channels/${item._id}`} className={({ isActive }) => cc([s.link, { [s.active]: isActive }])}>
              # {item.name}
            </NavLink>
          }

          {item.type === "group" &&
            <NavLink to={`/groups/${item._id}`} className={({ isActive }) => cc([s.link, { [s.active]: isActive }])}>
              &amp; {item.name}
            </NavLink>
          }
        </div>
      )}

      <div className={s.push}>
        <button type="button" onClick={handlePushClick}>Test Pushes</button>
      </div>
    </div>
  )
})
