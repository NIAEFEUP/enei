import { usePage } from '@inertiajs/react'
import { useEffect, useMemo } from 'react'
import { Toast, toast } from './use_toast'

export function useError(key: string) {
  const page = usePage()
  const error = useMemo(() => {
    const props = page.props
    if (props.errors && key in props.errors) {
      return props.errors[key]
    }

    return null
  }, [page.props])

  return error
}

export function useErrorToast(key: string, toastCreator: (msg: string) => Toast) {
  const error = useError(key)
  const toastContent = useMemo(() => error && toastCreator(error), [error])

  useEffect(() => {
    if (toastContent) {
      const t = toast(toastContent)
      return () => t.dismiss()
    }
  }, [toastContent])
}
