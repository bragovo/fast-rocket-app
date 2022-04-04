import { useRootContext } from "app/context";
import { RoomData } from "app/models";
import React, { FC, useMemo } from "react";
import { Send } from "../Send";

import s from './index.module.css'

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID } = import.meta.env

export const Messages: FC<RoomData> = ({ messages }) =>  {
  const { threadsStore, space } = useRootContext()

  const messagesNormalized = useMemo(() => {
    return messages.filter(message => !message.t)
  }, [messages])

  const handleThreadClick = (tmid: string) => {
    if (space) threadsStore.setThread(space, tmid)
  }

  return (
    <div className={s.root}>
      <div className={s.messages}>
        {messagesNormalized.map((message, index, arr) =>
          <div key={message._id} className={s.message}>
            <div className={s.avatar}>
              {(index === 0 || arr[index - 1].u._id !== message.u._id) &&
                <div className={s.image}>
                  <img src={`${SPACE_ID}/avatar/${message.u.username}`} />
                </div>
              }
            </div>

            <div>
              {(index === 0 || arr[index - 1].u._id !== message.u._id) &&
                <div>
                  <strong>{message.u.name}</strong>
                </div>
              }

              <div>
                {message.msg}
              </div>

              {message.tcount && message.tcount > 0 &&
                <div className={s.thread}>
                  <button type="button" onClick={() => handleThreadClick(message._id)}>
                    <div className={s.avs}>
                      <div className={s.av} />
                      <div className={s.av} />
                      <div className={s.av} />
                    </div>
                    <div>{message.tcount} replies</div>
                    <div className={s.rarr}>&rarr;</div>
                  </button>
                </div>
              }
            </div>
          </div>
        )}
      </div>

      <div>
        <Send />
      </div>
    </div>
  )
}
