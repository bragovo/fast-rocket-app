import { useRootContext } from "app/context";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Messages } from "../Messages";

import s from './index.module.css'

export const Channel: FC = observer(() =>  {
  const { channelId } = useParams()
  const { channelsStore, space } = useRootContext()

  useEffect(() =>  {
    if (space && channelId && !channelsStore.channels[channelId]) {
      channelsStore.loadChannel(space, channelId)
    }
  }, [channelId, space])

  if (!channelId || !space) return null;

  return (
    <div className={s.root}>
      {channelsStore.channels[channelId] &&
        <>
          <div className={s.header}>
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
