import { RoomData } from "app/models";
import React, { FC, useMemo } from "react";

import s from './index.module.css'

export const Messages: FC<RoomData> = ({ messages }) =>  {
  const messagesNormalized = useMemo(() => {
    return messages.filter(message => !message.t)
  }, [messages])

  return (
    <div className={s.root}>
      <div className={s.messages}>
        {messagesNormalized.map((message, index, arr) =>
          <div key={message._id} className={s.message}>
            <div className={s.avatar}>
              {(index === 0 || arr[index - 1].u._id !== message.u._id) &&
                <div className={s.image} />
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
