import React, { FC, useEffect, useState } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom"

import { Layout } from './Layout'
import { Intro } from './modules/Intro'
import { AddWorkspace } from './modules/AddWorkspace'
import { observer } from 'mobx-react-lite';
import { useRootContext } from './context'
import { Room } from './modules/Room'

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

            <Route path="rooms/:roomId">
              <Route index element={<Room />} />
              <Route path=":threadId" element={<Room />} />
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
