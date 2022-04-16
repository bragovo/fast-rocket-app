import React, { FC, useState } from "react"
import { createEditor, BaseEditor, Descendant } from "slate"
import { Slate, Editable, withReact, ReactEditor } from "slate-react"

import s from "./index.module.css"

interface CustomElement {
  type: "paragraph"
  children: CustomText[]
}
interface CustomText {
  text: string
  bold?: true
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
]

export const Send: FC = () => {
  // const textareaRef = useRef(null)
  const [editor] = useState(() => withReact(createEditor()))

  // const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   e.target.style.height = "auto"
  //   e.target.style.height = `${e.target.scrollHeight}px`
  // }

  return (
    <div className={s.root}>
      <Slate editor={editor} value={initialValue}>
        <Editable className={s.in} />
      </Slate>
    </div>
  )
}
