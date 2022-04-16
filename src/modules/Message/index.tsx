import { MessageStore } from "app/stores/MessageStore"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Link } from "react-router-dom"

import s from "./index.module.css"

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID } = import.meta.env

export const Message: FC<{ message: MessageStore; fis: boolean }> = observer(({ message, fis }) => {
  return (
    <div key={message._id} className={s.root}>
      <div className={s.avatar}>
        {fis && (
          <div className={s.image}>
            <img src={`${SPACE_ID as string}/avatar/${message.u.username}`} />
          </div>
        )}
      </div>

      <div>
        {fis && (
          <div>
            <strong>{message.u.name}</strong>
          </div>
        )}

        <div>{message.msg}</div>

        {message.tcount !== undefined && message.tcount > 0 && (
          <Link to={message._id} className={s.thread}>
            <div className={s.avs}>
              <div className={s.av} />
              <div className={s.av} />
              <div className={s.av} />
            </div>
            <div>{message.tcount} replies</div>
            <div className={s.rarr}>&rarr;</div>
          </Link>
        )}
      </div>
    </div>
  )
})
