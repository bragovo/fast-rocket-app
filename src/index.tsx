import React, { useEffect, useState } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { RootContext } from './context'
import { RootStore } from './store'
import { Layout } from './layout'
import { Intro } from './modules/Intro'

const App = () => {
  const [store] = useState(new RootStore())

  return (
    <RootContext.Provider value={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            {/* <Route path="channels">
              <Route path=":channelId" element={<Channel />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </RootContext.Provider>
  )
}

const container = document.getElementById('app')

if (container) {
  const root = ReactDOMClient.createRoot(container)
  root.render(<App />);
}
