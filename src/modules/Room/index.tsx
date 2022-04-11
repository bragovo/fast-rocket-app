import { useRootContext } from "app/context";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Messages } from "../Messages";

import s from './index.module.css'

export const Room: FC = observer(() =>  {
  const { roomId, threadId } = useParams()
  const { space, roomsStore, threadsStore } = useRootContext()

  useEffect(() =>  {
    if (roomId && roomsStore.rooms[roomId]) {
      roomsStore.rooms[roomId].loadMessages()
    }
  }, [roomId])

  useEffect(() => {
    if (threadId) {
      threadsStore.setThread(threadId)
    }
  }, [threadId])

  if (!roomId || !space) return null;

  return (
    <div className={s.root}>
      {roomsStore.rooms[roomId] &&
        <>
          <div className={s.header}>
            {roomId} - {threadId}
          </div>

          <div className={s.messages}>
            <Messages roomStore={roomsStore.rooms[roomId]} />
          </div>
        </>
      }
    </div>
  )
})
