import React, { FC } from "react"
import { Outlet } from "react-router-dom"

export const Layout: FC = () => {
  return (
    <div>
      <div>
        Channels
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
