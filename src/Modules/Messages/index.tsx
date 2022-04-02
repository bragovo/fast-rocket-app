import { RoomData } from "app/models";
import React, { FC } from "react";

import s from './index.module.css'

export const Messages: FC<RoomData> = ({ messages }) =>  {
  return (
    <div className={s.root}>
      <div className={s.messages}>
        {messages.map(message =>
          <div key={message._id} className={s.message}>
            {message.msg}
          </div>
        )}
      </div>
    </div>
  )
}
