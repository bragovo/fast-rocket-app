import { RoomStore } from "app/stores/RoomStore"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Message } from "../Message"
import { Send } from "../Send"

import s from "./index.module.css"

export const Messages: FC<{ roomStore: RoomStore }> = observer(({ roomStore }) => {
  return (
    <div className={s.root}>
      <div className={s.messages}>
        {roomStore.displayMessages.map((message, index, arr) => (
          <Message key={message._id} message={message} fis={index === 0 || arr[index - 1].u._id !== message.u._id} />
        ))}
      </div>

      <div>
        <Send />
      </div>
    </div>
  )
})
