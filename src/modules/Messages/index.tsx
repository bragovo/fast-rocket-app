import { useRootContext } from "app/context";
import { RoomStore } from "app/stores/RoomStore";
import { observer } from "mobx-react-lite";
import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { Message } from "../Message";
import { Send } from "../Send";

import s from './index.module.css'

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID } = import.meta.env

export const Messages: FC<{ roomStore: RoomStore }> = observer(({ roomStore }) =>  {

  return (
    <div className={s.root}>
      <div className={s.messages}>
        {roomStore.displayMessages.map((message, index, arr) =>
          <Message key={message._id} message={message} fis={index === 0 || arr[index - 1].u._id !== message.u._id} />
        )}
      </div>

      <div>
        <Send />
      </div>
    </div>
  )
})
