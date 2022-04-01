import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useRootContext } from "app/context";

export const Channels: FC = observer(() => {
  const { channelsStore: { channelsJoined } } = useRootContext()

  return (
    <div>
      {channelsJoined?.map(channel =>
        <div key={channel._id}>
          <Link to={`/channels/${channel._id}`}>
            {channel.name}
          </Link>
        </div>
      )}
    </div>
  )
})
