/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FC } from "react"
import localForage from "localforage"

import s from "./index.module.css"
import { useRootContext } from "app/context"
import { useForm, SubmitHandler } from "react-hook-form"

interface FormData {
  userId: string
  authToken: string
}

// TODO: Rewrite this component
export const AddWorkspace: FC = () => {
  const rootStore = useRootContext()

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<FormData>({ defaultValues: { authToken: "", userId: "" } })

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    await localForage.setItem("userId", data.userId)
    await localForage.setItem("authToken", data.authToken)
    await rootStore.authStore.initialize()
  }

  return (
    <div className={s.root}>
      <div className={s.workspace}>
        <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
          <input className={s.in} placeholder="Enter user id.." {...register("userId", { required: true })} />

          <textarea
            className={s.in}
            placeholder="Enter access token.."
            {...register("authToken", { required: true })}
            rows={3}
          />

          <button
            className={s.button}
            disabled={watch("userId") === "" || watch("authToken") === "" || isSubmitting || isSubmitted}
          >
            Launch 🚀
          </button>
        </form>
      </div>
    </div>
  )
}
