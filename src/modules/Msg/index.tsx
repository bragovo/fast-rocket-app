import { MessageStore } from "app/stores/MessageStore"
import React, { FC, useMemo } from "react"
// TODO: maybe replace marked-react package with pure marked
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

const renderer = {
  paragraph(text: string) {
    return (
      // @ts-expect-error: elementId does not exists https://github.com/sibiraj-s/marked-react/issues/3
      <p key={this.elementId} className={s.paragraph}>
        {text}
      </p>
    )
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
