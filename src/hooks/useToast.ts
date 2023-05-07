/* eslint-disable indent */
import { NotificationVariants } from '@/types/types'
import { toast } from 'react-toastify'

export const useToast = () => {
  return function (type: NotificationVariants, message: string) {
    const config = {
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      className: 'toast-message',
      pauseOnFocusLoss: false,
      hideProgressBar: true
    }
    switch (type) {
      case NotificationVariants.WARNING:
        toast.warning(message, config)
        break
      case NotificationVariants.SUCCESS:
        toast.success(message, config)
        break
      case NotificationVariants.ERROR:
        toast.error(message, config)
        break
      default:
        return false
    }
  }
}
