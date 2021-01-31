import * as React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { TransitionStatus } from 'react-transition-group/Transition'
import { Styles } from '../../styles'
import { Animated } from '../animated'
import { View, ViewStyle } from '../view'
import defaultBehaviorFactory from './defaultBehavior'
import {
  AnimationValues,
  TransitionValues,
  useCustomAnim,
} from './useCustomAnim'

type Props = {
  timeout?: number
  children: React.ReactNode
  in?: boolean
  wrapperStyle?: ViewStyle
  id: string | number | undefined
  animation?: BehaviorFactory
  clean?: boolean
}

type Behavior = {
  transitionValues: Partial<TransitionValues>
  initialAnimatedValues: Partial<AnimationValues>
}

type BehaviorFactory = (isInit?: boolean) => Behavior

export const fill = Styles.createViewStyle({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
})

const Animation = React.forwardRef(function(
  {
    state,
    timeout,
    wrapperStyle,
    children,
    isInit,
    behavior = defaultBehaviorFactory,
  }: {
    timeout: number
    state: TransitionStatus
    wrapperStyle?: ViewStyle
    children: React.ReactNode
    isInit: boolean
    behavior?: (isInit: boolean) => Behavior
  },
  ref: (view: Animated.View) => void
) {
  const [animatedStyle] = useCustomAnim({
    duration: timeout,
    status: state,
    ...behavior(isInit),
    behaviorKey: behavior.name,
  })

  return (
    <Animated.View
      ref={ref as any}
      style={[animatedStyle.current, fill, wrapperStyle]}
    >
      {children}
    </Animated.View>
  )
})

function AnimatedTransition({
  in: inProp,
  animation: behavior,
  children,
  wrapperStyle,
  clean,
  timeout = 300,
}: Props) {
  const nodeRef = React.useRef()
  const [isInit, setInInit] = React.useState(false)
  React.useEffect(() => {
    if (!isInit) {
      setInInit(true)
    }
  }, [isInit])
  const setRef = React.useCallback(ref => {
    nodeRef.current = ref
  }, [])
  return (
    <Transition in={inProp} timeout={timeout} nodeRef={nodeRef}>
      {state => {
        const isDisplay = !clean || (clean && state !== 'exited')
        return (
          isDisplay && (
            <Animation
              ref={setRef}
              behavior={behavior}
              state={state}
              isInit={isInit}
              wrapperStyle={wrapperStyle}
              timeout={timeout}
            >
              {children}
            </Animation>
          )
        )
      }}
    </Transition>
  )
}

export default function(props: Omit<Props, 'in'>) {
  return (
    <TransitionGroup
      component={View}
      style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
    >
      <AnimatedTransition key={props.id} {...props} />
    </TransitionGroup>
  )
}
