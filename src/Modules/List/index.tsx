import { observer } from "mobx-react-lite";
import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { useRootContext } from "app/context";

import s from './index.module.css';

export const List: FC = observer(() => {
  const { channelsStore: { channelsJoined: channels }, groupsStore: { groups } } = useRootContext()

  const list = useMemo(() => {
    return [
      ...groups.map(group => ({ _id: group._id, name: group.name, type: "channel" })),
      ...channels.map(channel => ({ _id: channel._id, name: channel.name, type: "group" })),
    ].sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
  }, [groups, channels])

  return (
    <div className={s.root}>
      {list.map(item =>
        <div className={s.item} key={item._id}>
          {item.type === "channel" &&
            <Link to={`/channels/${item._id}`} className={s.link}>
              # {item.name}
            </Link>
          }

          {item.type === "group" &&
            <Link to={`/groups/${item._id}`} className={s.link}>
              = {item.name}
            </Link>
          }
        </div>
      )}
    </div>
  )
})
