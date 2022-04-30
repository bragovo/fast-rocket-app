import { MessageStore } from "app/stores/MessageStore"
import React, { FC, useMemo } from "react"
import Markdown from "marked-react"

import s from "./index.module.css"

export const Msg: FC<{ messageStore: MessageStore }> = ({ messageStore }) => {
  const msg = useMemo(() => {
    // let temp = messageStore.msg
    // temp = temp.replace(/((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi, `[$1]($1)`)

    return <Markdown value={messageStore.msg} renderer={renderer} />
  }, [])

  return <div>{msg}</div>
}

// const renderer = new Renderer()

// renderer.paragraph = (text: string) => {
//   return <div>qqqq</div>
// }

const renderer = {
  paragraph(text: string) {
    return <p className={s.paragraph}>{text}</p>
  },
  code(code: string, infostring: string, escaped: boolean) {
    return <code className={s.code}>{code}</code>
  },
  codespan(code: string) {
    return <code className={s.codespan}>{code}</code>
  },
  link(src: string, title: string) {
    return (
      <a href={src} className={s.link}>
        {title}
      </a>
    )
  },
}
