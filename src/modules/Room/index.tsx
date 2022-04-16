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
    if (roomId !== undefined && roomsStore.rooms[roomId] !== undefined) {
      roomsStore.rooms[roomId].loadMessages()
    }
  }, [roomId])

  useEffect(() => {
    if (threadId !== undefined) {
      threadsStore.setThread(threadId)
    }
  }, [threadId])

  if (roomId === undefined || space === undefined) return null;

  return (
    <div className={s.root}>
      {roomsStore.rooms[roomId] !== undefined &&
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
