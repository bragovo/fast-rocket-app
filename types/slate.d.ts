import { BaseEditor, Descendant } from "slate"
import { ReactEditor } from "slate-react"

export interface MentionElement {
  type: "mention"
  character: string
  children: CustomText[]
}

export interface ParagraphElement {
  type: "paragraph"
  align?: string
  children: Descendant[]
}

type CustomElement = MentionElement | ParagraphElement

export interface CustomText {
  strong?: boolean
  em?: boolean
  code?: boolean
  codespan?: boolean
  text: string
}

// export interface EmptyText {
//   text: string
// }

export type CustomEditor = BaseEditor & ReactEditor

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
