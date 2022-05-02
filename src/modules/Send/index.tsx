import React, { FC, useCallback, useState } from "react"
import { BaseRange, createEditor, Descendant, NodeEntry, Text } from "slate"
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react"
import { marked } from "marked"
import cc from "classcat"

import s from "./index.module.css"

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
]

export const Send: FC = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
  const decorate = useCallback(([node, path]: NodeEntry) => {
    const ranges: BaseRange[] = []

    if (!Text.isText(node)) {
      return ranges
    }

    let start = 0
    const nd = marked.lexer(node.text)[0] as marked.Tokens.Paragraph
    if (nd !== undefined) {
      nd.tokens.forEach((token) => {
        const length = token.raw.length
        const end = start + length

        if (token.type !== "text") {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          })
        }

        start = end
      })
    }

    return ranges
  }, [])

  return (
    <div className={s.root}>
      <Slate editor={editor} value={initialValue}>
        <Editable renderLeaf={renderLeaf} decorate={decorate} className={s.in} placeholder="Send message here..." />
      </Slate>
    </div>
  )
}

const Leaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  return (
    <span
      className={cc({ [s.strong]: leaf.strong, [s.em]: leaf.em, [s.code]: leaf.code, [s.codespan]: leaf.codespan })}
      {...attributes}
    >
      {children}
    </span>
  )
}
