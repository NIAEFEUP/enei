import { Option } from '~/components/ui/multiple-selector'
import transports from '#data/enei/signup/transports.json' with { type: 'json' }

export const TRANSPORTS: Option[] = transports.map(({ id, description }) => {
  return {
    label: description,
    value: id,
  }
})
