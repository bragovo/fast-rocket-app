import { useRootContext } from "app/context"
import { SpaceStore } from "app/stores/SpaceStore"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import s from "./index.module.css"
import { DesktopNotificationsType, PreferencesData } from "./models"

interface FormData {
  desktopNotifications: DesktopNotificationsType
}

export const Account: FC = observer(() => {
  const navigate = useNavigate()
  const rootStore = useRootContext()
  const [initialized, setInitialized] = useState(false)

  const handleCloseClick = (): void => {
    navigate("/workspace")
  }

  const { register, watch, getValues } = useForm<FormData>({ defaultValues: { desktopNotifications: "all" } })

  useEffect(() => {
    const _loadData = async (space: FormData): Promise<void> => {
      // const data = await space.getRequest<PreferencesData>("/users.getPreferences", {})

      // if (data.success) {
      //   if (data.preferences.desktopNotifications !== undefined) {
      //     reset({
      //       desktopNotifications: data.preferences.desktopNotifications,
      //     })
      //   }
      // }

      console.log(space)

      setInitialized(true)
    }

    if (rootStore.space !== false) {
      void _loadData(rootStore.space)
    }
  }, [rootStore.space])

  const watchAll = watch()

  useEffect(() => {
    const _saveData = async (space: SpaceStore): Promise<void> => {
      await space.postRequest<PreferencesData>("/users.setPreferences", { data: getValues() })
    }

    // TODO: remove save after reset
    if (rootStore.space !== false && initialized) {
      void _saveData(rootStore.space)
    }
  }, [watchAll, initialized])

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1>Account</h1>

        <div className={s.close} onClick={handleCloseClick} />
      </div>

      {initialized && (
        <div className={s.container}>
          <form>
            <div className={s.it}>
              <div className={s.lb}>Desktop notifications</div>

              <label className={s.radio}>
                <input {...register("desktopNotifications")} type="radio" value="default" />
                Default (server settings)
              </label>

              <label className={s.radio}>
                <input {...register("desktopNotifications")} type="radio" value="all" />
                All new messages
              </label>

              <label className={s.radio}>
                <input {...register("desktopNotifications")} type="radio" value="mentions" />
                Direct messages &amp; mentions
              </label>

              <label className={s.radio}>
                <input {...register("desktopNotifications")} type="radio" value="nothing" />
                Nothing
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  )
})
