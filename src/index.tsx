import React, { FC, useEffect, useState } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom"

import { Layout } from './layout'
import { Intro } from './modules/Intro'
import { Channel } from './modules/Channel'
import { Group } from './modules/Group'
import { AddWorkspace } from './modules/AddWorkspace'
import { observer } from 'mobx-react-lite';
import { useRootContext } from './context'

const App: FC = observer(() => {
  const navigate = useNavigate()
  const rootStore = useRootContext()

  useEffect(() => {
    if (rootStore.space) {
      navigate("/workspace", { replace: true })
    } else {
      navigate("/", { replace: true })
    }
  }, [rootStore.space])

  return (
    <>
      <Outlet />
    </>
  )
})

const FastRocketApp: FC = observer(() => {
  const rootStore = useRootContext()

  if(!rootStore.initialized) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AddWorkspace />} />

          <Route path="workspace" element={<Layout />}>
            <Route index element={<Intro />} />

            <Route path="channels">
              <Route path=":channelId" element={<Channel />} />
            </Route>

            <Route path="groups">
              <Route path=":groupId" element={<Group />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
})

const container = document.getElementById('app')

if (container) {
  const root = ReactDOMClient.createRoot(container)
  root.render(<FastRocketApp />);
}
