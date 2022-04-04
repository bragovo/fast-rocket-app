import React, { FC, useRef } from "react";

import s from './index.module.css'

export const Send: FC = () => {
  const textareaRef = useRef(null)

  // const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   e.target.style.height = "auto"
  //   e.target.style.height = `${e.target.scrollHeight}px`
  // }

  return (
    <div className={s.root}>
      <textarea className={s.textarea} />
    </div>
  )
}
