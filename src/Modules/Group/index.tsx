import { useRootContext } from "app/context";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Messages } from "../Messages";

import s from './index.module.css'

export const Group: FC = observer(() =>  {
  const { groupId } = useParams()
  const { groupsStore } = useRootContext()

  if (!groupId) return null;

  useEffect(() =>  {
    if (!groupsStore.groups[groupId]) {
      groupsStore.loadGroup(groupId)
    }
  }, [groupId])

  return (
    <div className={s.root}>
      {groupsStore.groups[groupId] &&
        <>
          <div className={s.header}>
            {groupId}
          </div>

          <div className={s.messages}>
            <Messages messages={groupsStore.groups[groupId].messages} />
          </div>
        </>
      }
    </div>
  )
})
