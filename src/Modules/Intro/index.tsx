import React, { FC, useEffect } from "react"
import { nanoid } from 'nanoid'

console.log(import.meta.env.SNOWPACK_PUBLIC_SPACE_ID)

const { SNOWPACK_PUBLIC_AUTH_TOKEN: AUTH_TOKEN, SNOWPACK_PUBLIC_USER_ID: USER_ID } = import.meta.env

export const Intro: FC = () => {
  const socket = new WebSocket('wss://brg9876.rocket.chat/websocket');

  useEffect(() => {
    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({
        msg: "connect",
        version: "1",
        support: ["1"]
      }))

      socket.send(JSON.stringify({
        msg: "method",
        method: "login",
        id: "1",
        params: [{ resume: AUTH_TOKEN }]
      }));

      socket.send(JSON.stringify({
        msg: "sub",
        id: nanoid(),
        name: "stream-room-messages",
        params: ["GENERAL", false]
      }));

      socket.send(JSON.stringify({
        msg: "sub",
        id: nanoid(),
        name: "stream-notify-user",
        params: [`${USER_ID}/notification`, false]
      }));

    });

    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data)
      if(data["msg"] === "ping") {
        socket.send(JSON.stringify({
          msg: "pong",
        }))
      } else {
        console.log(data)
      }
    });
  })

  return (
    <div>
      <p>
        Intro page
      </p>
    </div>
  )
}
