import { useTuyau as $useTuyau } from '@tuyau/inertia/react'
import type { TuyauClient } from '~/app/tuyau'

export function useTuyau() {
    return $useTuyau() as TuyauClient
}
