import { useRootContext } from "app/context";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Messages } from "../Messages";

import s from './index.module.css'

export const Channel: FC = observer(() =>  {
  const { channelId } = useParams()
  const { channelsStore } = useRootContext()

  if (!channelId) return null;

  useEffect(() =>  {
    if (!channelsStore.channels[channelId]) {
      channelsStore.loadChannel(channelId)
    }
  }, [channelId])

  return (
    <div className={s.root}>
      {channelsStore.channels[channelId] &&
        <>
          <div className={s.channel}>
            {channelId}
          </div>

          <div className={s.messages}>
            <Messages messages={channelsStore.channels[channelId].messages} />
          </div>
        </>
      }
    </div>
  )
})
