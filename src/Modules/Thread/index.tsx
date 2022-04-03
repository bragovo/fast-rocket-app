import { useRootContext } from "app/context";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Messages } from "../Messages";

import s from './index.module.css'

export const Thread: FC = observer(() => {
  const { threadsStore } = useRootContext()
  const threadStore = threadsStore.tmid && threadsStore.threads[threadsStore.tmid]

  if (!threadStore) return null

  return (
    <div className={s.root}>
      <div>
        <Messages messages={threadStore.messages} />
      </div>
    </div>
  )
})
