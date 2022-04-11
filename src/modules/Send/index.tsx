import React, { FC, useRef, useState } from "react";
import { createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { BaseEditor, Descendant } from 'slate'

import s from './index.module.css'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

export const Send: FC = () => {
  const textareaRef = useRef(null)
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
