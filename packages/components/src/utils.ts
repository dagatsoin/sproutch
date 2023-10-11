import { useEffect } from 'react'

export function componentDidMount(effect: React.EffectCallback) {
    return useEffect(effect, [])
}