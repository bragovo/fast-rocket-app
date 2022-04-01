import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import { Channels } from "../modules/Channels"

export const Layout: FC = () => {
  return (
    <div>
      <div>
        <Channels />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
