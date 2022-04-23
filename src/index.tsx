import React, { FC, useEffect } from "react"
import * as ReactDOMClient from "react-dom/client"
import { BrowserRouter, Routes, Route, useNavigate, Outlet } from "react-router-dom"

import { Layout } from "./Layout"
import { Intro } from "./modules/Intro"
import { AddWorkspace } from "./modules/AddWorkspace"
import { observer } from "mobx-react-lite"
import { useRootContext } from "./context"
import { Room } from "./modules/Room"
import { Account } from "./modules/Account"

const App: FC = observer(() => {
  const navigate = useNavigate()
  // const location = useLocation()
  const rootStore = useRootContext()

  useEffect(() => {
    if (rootStore.authStore.initialized && (!rootStore.authStore.auth || rootStore.space === false)) {
      navigate("/", { replace: true })
    } else {
      // if (location.pathname === "/")
      navigate("/workspace", { replace: true })
    }
  }, [rootStore.space, rootStore.authStore.initialized, rootStore.authStore.auth])

  return (
    <>
      <Outlet />
    </>
  )
})

const FastRocketApp: FC = observer(() => {
  const rootStore = useRootContext()

  if (!rootStore.initialized) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AddWorkspace />} />
          <Route path="account" element={<Account />} />

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

const container = document.getElementById("app")

if (container != null) {
  const root = ReactDOMClient.createRoot(container)
  root.render(<FastRocketApp />)
}
