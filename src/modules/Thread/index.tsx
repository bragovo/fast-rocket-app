import { useRootContext } from "app/context";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Message } from "../Message";

import s from './index.module.css'

export const Thread: FC = observer(() => {
  const { threadsStore } = useRootContext()
  const threadStore = threadsStore.tmid !== false && threadsStore.threads[threadsStore.tmid]

  if (threadStore === false) return null

  return (
    <div className={s.root}>
      <div className={s.header}>
        Thread title
      </div>

      <div className={s.messages}>
        {threadStore.displayMessages.map((message, index, arr) =>
          <Message key={message._id} message={message} fis={index === 0 || arr[index - 1].u._id !== message.u._id} />
        )}
      </div>
    </div>
  )
})
