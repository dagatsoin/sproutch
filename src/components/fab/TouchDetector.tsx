import * as React from 'react'
import { Types } from 'reactxp'

import { Styles } from '../../styles'
import { Position } from '../../types/shared'
import { Animated } from '../animated'
import { LayoutInfo } from '../view'

const DEFAULT_LONG_PRESS_DELAY = 200

type Props = {
  positionRelativeToParent: Position
  containerPositionRelativeToWindow: Position
  longPressDelay?: number
  onRef(instance: TouchDetector): void
  onObjectTouchStart?(touchedObject: TouchedObject): void
  onTouchStop?(targetId?: string): void
  onObjectLongTouchStart?(touchedObject: TouchedObject): void
  onObjectLongTouchStop?(targetId: string): void
  onPointerDistancesFromLayouts?(
    pointerDistancesFromLayouts: PointerFromLayoutsDistances
  ): void
  onTargetChange?(change: TargetChange): void
  onClick?(targetId: string): void
}

type SAMModelData = {
  touches: Touch[]
  objectLayouts: Map<string, LayoutInfo>
  longPressDelay: number
  longTouchIds: string[]
  willCancelNextPressEvent: boolean
}

export type TouchedObject = { targetId: string; touchUIDs: string[] }

export type PointerFromLayoutsDistances = Array<{
  targetId: string
  distance: number
}>

type SAMRepresentation = Partial<{
  touchDetectorLayout: LayoutInfo
  didReleaseEmptyTouch: boolean
  newTargets: TouchedObject[]
  oldTouchTargetIds: string[]
  oldLongTouchTargetIds: string[]
  newLongTouch: TouchedObject
  clickTargetId: string
  // For each pointer, associate an array representing the distance in px
  // from the pointer to each layout.
  pointerDistancesFromLayouts: PointerFromLayoutsDistances
  targetChange: TargetChange
}>

export type TargetChange = {
  op: 'exited' | 'entered'
  prevTarget: string
  target: string
}

interface SAMInstance<M, R, A> {
  data: M
  actions: A
  onRepresentation(rep: R): void
}

type AddObject = {
  type: 'addObject'
  payload: {
    objectId: string
    layout: LayoutInfo
  }
}

type RemoveObject = {
  type: 'removeObject'
  payload: {
    nodeId: string
  }
}

type Pointer = {
  // An uniq id to differentiate
  // touches with the same identifier (the finger number)
  // across multiple steps.
  // Usecase: In case of double tapes, the same identifier will be present
  // across multiple steps, but won't be the same touch. It could cause issue
  // while detecting a longtouch.
  uid: string
  localX: number
  localY: number
  timeStamp: number
}

type Touch = Pointer & {
  identifier: Types.Touch['identifier']
}

type Click = Pointer

type StartTouch = {
  type: 'startTouch'
  payload: {
    touches: Touch[]
  }
}

type StopTouch = {
  type: 'stopTouch'
  payload: {
    touches: Touch[]
  }
}

type AddLongTouch = {
  type: 'addLongTouch'
  payload: {
    touch: Touch
  }
}

type MoveTouch = {
  type: 'moveTouch'
  payload: {
    identifier: number
    localX: number
    localY: number
  }
}

type Clicked = {
  type: 'clicked'
  payload: {
    click: Click
  }
}
type Proposal =
  | AddObject
  | RemoveObject
  | StartTouch
  | StopTouch
  | AddLongTouch
  | MoveTouch
  | Clicked

type Actions = {
  addObject(objectId: string, layout: LayoutInfo): void
  removeObject(nodeId: string): void
  startLongTouch(touch: Touch): void
}

export class TouchDetector extends React.Component<Props>
  implements SAMInstance<SAMModelData, SAMRepresentation, Actions> {
  get data(): SAMModelData {
    return this._SAMModelData
  }

  private get localPositionRelativeToPage(): Position {
    return {
      x: this.props.containerPositionRelativeToWindow.x,
      y: this.props.containerPositionRelativeToWindow.y,
    }
  }

  public actions = {
    addObject: (objectId: string, layout: LayoutInfo) => {
      present(this, {
        type: 'addObject',
        payload: {
          objectId,
          layout,
        },
      })
      this.forceUpdate()
    },
    removeObject: (nodeId: string) => {
      present(this, {
        type: 'removeObject',
        payload: {
          nodeId,
        },
      })
    },
    startLongTouch: (touch: Touch) => {
      present(this, {
        type: 'addLongTouch',
        payload: {
          touch,
        },
      })
    },
  }
  private touchDetectorAnimatedValue = {
    x: Animated.createValue(1.0),
    y: Animated.createValue(1.0),
    width: Animated.createValue(1.0),
    height: Animated.createValue(1.0),
  }

  private touchDetectorAnimation: Types.StyleRuleSet<Types.AnimatedViewStyle>

  private _SAMModelData: SAMModelData = {
    objectLayouts: new Map(),
    touches: [],
    longTouchIds: [],
    longPressDelay: DEFAULT_LONG_PRESS_DELAY,
    willCancelNextPressEvent: false,
  }

  public onRepresentation = (rep: SAMRepresentation) => {
    // update touch detector layout
    if (rep.touchDetectorLayout) {
      this.setBoundingBox(rep.touchDetectorLayout)
    }

    // inform consumer about new touched targets
    rep.newTargets?.forEach(this.onObjectTouchStart)

    // inform consumer about lost targets after some normal touches
    rep.oldTouchTargetIds?.forEach(this.onObjectTouchStop)

    // inform consumer that the touch was release outside any
    if (rep.didReleaseEmptyTouch) {
      this.onObjectTouchStop()
    }

    // inform consumer about the start of a new long touch
    if (rep.newLongTouch) {
      this.onObjectLongTouchStart(rep.newLongTouch)
    }

    // inform consumer about lost targets after some long touches
    rep.oldLongTouchTargetIds?.forEach(this.onObjectLongTouchStop)

    // inform consumer about a mouse click target
    if (rep.clickTargetId && this.props.onClick) {
      this.props.onClick(rep.clickTargetId)
    }

    // inform consumer about a the pointers distance from each layout center
    if (
      this.props.onPointerDistancesFromLayouts &&
      rep.pointerDistancesFromLayouts
    ) {
      this.props.onPointerDistancesFromLayouts(rep.pointerDistancesFromLayouts)
    }

    // inform consumer that the target changed during moving
    if (rep.targetChange && this.props.onTargetChange) {
      this.props.onTargetChange(rep.targetChange)
    }
  }

  public setBoundingBox(boundingBox: LayoutInfo) {
    this.touchDetectorAnimatedValue.x.setValue(
      boundingBox.x + boundingBox.width / 2
    )
    this.touchDetectorAnimatedValue.y.setValue(
      boundingBox.y + boundingBox.height / 2
    )
    this.touchDetectorAnimatedValue.height.setValue(boundingBox.height)
    this.touchDetectorAnimatedValue.width.setValue(boundingBox.width)
  }

  constructor(props: Props) {
    super(props)
    this._SAMModelData.longPressDelay =
      this.props.longPressDelay || DEFAULT_LONG_PRESS_DELAY
    this.touchDetectorAnimation = Styles.createAnimatedViewStyle({
      transform: [
        { translateX: this.touchDetectorAnimatedValue.x },
        { translateY: this.touchDetectorAnimatedValue.y },
        { scaleX: this.touchDetectorAnimatedValue.width },
        { scaleY: this.touchDetectorAnimatedValue.height },
      ],
    })
  }

  public componentDidMount() {
    this.props.onRef && this.props.onRef(this)
  }

  public render() {
    return (
      <>
        <Animated.View
          onResponderStart={this.onResponderStart}
          onResponderRelease={this.onResponderRelease}
          onResponderMove={this.onResponderMove}
          onPress={this.onPress}
          style={[
            {
              position: 'absolute',
              width: 1,
              height: 1,
              left: 0,
              top: 0,
            },
            this.touchDetectorAnimation,
          ]}
        />
      </>
    )
  }

  /*
   * ACTIONS
   */

  private onResponderStart = (event: Types.TouchEvent) => {
    present(this, {
      type: 'startTouch',
      payload: {
        touches: getLocalTouches(
          event.nativeEvent.changedTouches,
          this.localPositionRelativeToPage
        ),
      },
    })
  }

  private onResponderRelease = (event: Types.TouchEvent) => {
    present(this, {
      type: 'stopTouch',
      payload: {
        touches: getLocalTouches(
          event.nativeEvent.changedTouches,
          this.localPositionRelativeToPage
        ),
      },
    })
  }

  private onResponderMove = (event: Types.TouchEvent) => {
    const touch = getLocalTouches(
      event.nativeEvent.changedTouches,
      this.localPositionRelativeToPage
    )[0]
    present(this, {
      type: 'moveTouch',
      payload: {
        identifier: touch.identifier,
        localX: touch.localX,
        localY: touch.localY,
      },
    })
  }

  /**
   * Parent callback
   */

  private onObjectTouchStart = (touchedObject: TouchedObject) => {
    if (this.props.onObjectTouchStart) {
      this.props.onObjectTouchStart(touchedObject)
    }
  }

  private onObjectTouchStop = (targetId?: string) => {
    if (this.props.onTouchStop) {
      if (!!targetId) {
        this.props.onTouchStop(targetId)
      } else {
        this.props.onTouchStop()
      }
    }
  }

  private onObjectLongTouchStart = (touchedObject: TouchedObject) => {
    if (this.props.onObjectLongTouchStart) {
      this.props.onObjectLongTouchStart(touchedObject)
    }
  }

  private onObjectLongTouchStop = (targetId: string) => {
    if (this.props.onObjectLongTouchStop) {
      this.props.onObjectLongTouchStop(targetId)
    }
  }

  private onPress = (event: Types.SyntheticEvent) => {
    if (this.props.onClick && isMouseClick(event)) {
      present(this, {
        type: 'clicked',
        payload: {
          click: getLocalClick(event, this.localPositionRelativeToPage),
        },
      })
    }
  }
}

function present(
  instance: SAMInstance<SAMModelData, SAMRepresentation, Actions>,
  proposal: Proposal
) {
  const oldModel: SAMModelData = {
    ...instance.data,
    longTouchIds: [...instance.data.longTouchIds],
    touches: instance.data.touches.map(touch => ({ ...touch })),
    objectLayouts: new Map(instance.data.objectLayouts),
  }
  // tslint:disable-next-line: switch-default
  switch (proposal.type) {
    case 'addObject':
      instance.data.objectLayouts.set(
        proposal.payload.objectId,
        proposal.payload.layout
      )
      break
    case 'removeObject':
      instance.data.objectLayouts.delete(proposal.payload.nodeId)
      break
    case 'startTouch':
      // On trackpad, if you don't move too long during a push, you will
      // trigger a right click.
      // This will terminate the responder without calling terminate/end
      // So this will let a dirty state with unterminated touch.
      // Workaround: if a new touch with the same finger is triggered,
      // clean the old touches and long touches with the same finter.
      cleanTouches(proposal, instance)
      instance.data.willCancelNextPressEvent = true
      // Now the state is clean, add the new touches
      instance.data.touches.push(...proposal.payload.touches)
      break
    case 'stopTouch':
      instance.data.willCancelNextPressEvent = true
      cleanTouches(proposal, instance)
      break
    case 'addLongTouch':
      // Valid only:
      // - if a touch has the same uid as the payload
      // - AND if the target has not changed
      const startTouch = instance.data.touches.find(
        ({ uid }) => proposal.payload.touch.uid === uid
      )

      // Is the same touch
      if (!!startTouch) {
        const startTarget = getTouchedObjects(
          [startTouch],
          instance.data.objectLayouts
        )[0]
        const currentTarget = getTouchedObjects(
          [proposal.payload.touch],
          instance.data.objectLayouts
        )[0]

        // Has the same target
        if (
          startTarget &&
          currentTarget &&
          startTarget.targetId === currentTarget.targetId
        ) {
          instance.data.longTouchIds.push(proposal.payload.touch.uid)
        }
      }
      break
    case 'moveTouch':
      const touch = instance.data.touches.find(
        ({ identifier }) => identifier === proposal.payload.identifier
      )
      if (touch) {
        touch.localX = proposal.payload.localX
        touch.localY = proposal.payload.localY
      }
  }
  computeNextState(oldModel, instance, proposal)
}

function cleanTouches(
  proposal: StartTouch | StopTouch,
  instance: SAMInstance<SAMModelData, any, any>
) {
  proposal.payload.touches.forEach(({ identifier }) => {
    const index = instance.data.touches.findIndex(
      ({ identifier: _identifier }) => identifier === _identifier
    )
    // Remove in touches
    const removed = instance.data.touches.splice(index, 1)
    // Remove in long touches
    if (removed[0]) {
      instance.data.longTouchIds.splice(
        instance.data.longTouchIds.indexOf(removed[0].uid),
        1
      )
    }
  })
}

function computeNextState(
  previousData: SAMModelData,
  {
    data,
    onRepresentation,
    actions,
  }: SAMInstance<SAMModelData, SAMRepresentation, Actions>,
  proposal: Proposal
) {
  const representation: SAMRepresentation = {}
  /**
   * COMPUTE REPRESENTATION
   */
  // tslint:disable-next-line: switch-default
  switch (proposal.type) {
    case 'addObject':
    case 'removeObject':
      representation.touchDetectorLayout = getBoundingBox(
        Array.from(data.objectLayouts.values())
      )
      break
    case 'startTouch':
      // Touch hit something
      representation.newTargets = getTouchedObjects(
        proposal.payload.touches,
        data.objectLayouts
      )
      break
    case 'stopTouch':
      // Touch stoped on something
      const oldTouches = proposal.payload.touches.map(
        ({ identifier }) =>
          previousData.touches.find(
            ({ identifier: _identifier }) => identifier === _identifier
          )!
      )

      const oldLongTouchIds = previousData.longTouchIds.filter(id =>
        oldTouches.some(({ uid }) => uid === id)
      )
      const oldNormalTouchIds = previousData.touches
        .map(({ uid }) => uid)
        .filter(uid => !oldLongTouchIds.includes(uid))

      const oldLongTouches = oldTouches.filter(({ uid }) =>
        oldLongTouchIds.includes(uid)
      )
      const oldNormalTouches = oldTouches.filter(({ uid }) =>
        oldNormalTouchIds.includes(uid)
      )

      const oldTouchTargetIds = (representation.oldTouchTargetIds = getTouchedObjects(
        oldNormalTouches,
        data.objectLayouts
      ).map(({ targetId }) => targetId))

      const oldLongTouchTargetIds = (representation.oldLongTouchTargetIds = getTouchedObjects(
        oldLongTouches,
        data.objectLayouts
      ).map(({ targetId }) => targetId))

      if (!oldLongTouchTargetIds.length && !oldTouchTargetIds.length) {
        representation.didReleaseEmptyTouch = true
      }

      break
    case 'addLongTouch':
      // LongTouch something
      if (data.longTouchIds.includes(proposal.payload.touch.uid)) {
        const target = getTouchedObjects(
          [proposal.payload.touch],
          data.objectLayouts
        )[0]
        if (target) {
          representation.newLongTouch = {
            targetId: target.targetId,
            touchUIDs: [proposal.payload.touch.uid],
          }
        }
      }
      break
    case 'moveTouch':
      // Finger is moving
      const movedTouch = data.touches.find(
        ({ identifier }) => identifier === proposal.payload.identifier
      )
      if (movedTouch) {
        representation.newTargets = getTouchedObjects(
          [movedTouch],
          data.objectLayouts
        )
        representation.pointerDistancesFromLayouts = []
        data.objectLayouts.forEach((layout, targetId) => {
          representation.pointerDistancesFromLayouts!.push({
            targetId,
            distance: Math.hypot(
              proposal.payload.localX - layout.x - layout.width / 2,
              proposal.payload.localY - layout.y - layout.height / 2
            ),
          })
        })
      }

      // Add target change to the representation
      representation.targetChange = getTargetChange(
        proposal,
        previousData,
        data
      )
      break
    case 'clicked':
      if (!data.willCancelNextPressEvent) {
        const targetId = getClickedObjectId(
          proposal.payload.click,
          data.objectLayouts
        )
        representation.clickTargetId = targetId
      }
  }
  /**
   * NAP
   */
  // tslint:disable-next-line: switch-default
  switch (proposal.type) {
    case 'startTouch':
      // Test if it is a long press after a delay
      proposal.payload.touches.forEach(touch => {
        setTimeout(() => {
          // The touch is still present. Note the use of Touch.uid and not Touch.identifier
          // because Touch.identifier can come back in the case of a quick double tap.
          actions.startLongTouch(touch)
        }, data.longPressDelay)
      })
      break
    case 'moveTouch':
      // The touch entered a new target.
      if (getTargetChange(proposal, previousData, data)?.op === 'entered') {
        setTimeout(() => {
          const touch = data.touches.find(
            ({ identifier }) => proposal.payload.identifier === identifier
          )
          if (touch) {
            // The touch target is still present. Let's try a longtouch.
            if (touch) actions.startLongTouch(touch)
          }
        }, data.longPressDelay)
      }
      break
  }

  /**
   * NEXT STEP
   */
  onRepresentation(representation)
}

/**
 * Compute the bounding box of an opened node.
 * The top/left direction taked in account the size of the layout button.
 */
function getBoundingBox(objectLayouts: LayoutInfo[]): LayoutInfo {
  if (!objectLayouts.length) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
  }
  const rightestChild = objectLayouts.reduce(
    (farestChild, childWithPosition) => {
      if (farestChild) {
        return farestChild.x > childWithPosition.x
          ? farestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    objectLayouts[0]
  )
  const leftestChild = objectLayouts.reduce(
    (closestChild, childWithPosition) => {
      if (closestChild) {
        return closestChild.x < childWithPosition.x
          ? closestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    objectLayouts[0]
  )
  const uppestChild = objectLayouts.reduce(
    (closestChild, childWithPosition) => {
      if (closestChild) {
        return closestChild.y < childWithPosition.y
          ? closestChild
          : childWithPosition
      } else {
        return childWithPosition
      }
    },
    objectLayouts[0]
  )
  const lowestChild = objectLayouts.reduce((farestChild, childWithPosition) => {
    if (farestChild) {
      return farestChild.y > childWithPosition.y
        ? farestChild
        : childWithPosition
    } else {
      return childWithPosition
    }
  }, objectLayouts[0])

  const leftest = leftestChild.x
  const rightest = rightestChild.x
  const uppest = uppestChild.y
  const lowest = lowestChild.y

  const width = rightest - leftest + rightestChild.width
  const height = lowest - uppest + lowestChild.height

  return {
    x: leftest,
    y: uppest,
    width,
    height,
  }
}

function getTouchedObjects(
  touches: Touch[],
  objectLayouts: Map<string, LayoutInfo>
): TouchedObject[] {
  const targets: TouchedObject[] = []
  touches.forEach(touch => {
    const touchedObjects = Array.from(objectLayouts.entries())
      .filter(([_, layout]) =>
        isInside({ x: touch.localX, y: touch.localY }, layout)
      )
      .map(([id]) => ({
        id,
        touchId: touch.uid,
      }))

    touchedObjects.forEach(target => {
      // Another touch is on the object
      const alreadyKnownTarget = targets.find(
        ({ targetId }) => targetId === target.id
      )
      if (alreadyKnownTarget) {
        alreadyKnownTarget.touchUIDs.push(target.touchId)
      } else {
        targets.push({
          targetId: target.id,
          touchUIDs: [target.touchId],
        })
      }
    })
  })
  return targets
}

function getClickedObjectId(
  click: Click,
  objectLayouts: Map<string, LayoutInfo>
): string | undefined {
  const targetLayout = Array.from(objectLayouts.entries()).find(([_, layout]) =>
    isInside({ x: click.localX, y: click.localY }, layout)
  )
  return targetLayout ? targetLayout[0] : undefined
}

function isInside(position: Position, layout: LayoutInfo): boolean {
  return (
    position.x >= layout.x &&
    position.x <= layout.x + layout.width &&
    position.y >= layout.y &&
    position.y <= layout.y + layout.height
  )
}

function getLocalTouches(
  touchList: Types.TouchList,
  localPositionRelativeToPage: Position
): Touch[] {
  const touches: Touch[] = []
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < touchList.length; i++) {
    const timeStamp = Date.now()
    touches.push({
      identifier: touchList[i].identifier,
      uid: touchList[i].identifier + '' + timeStamp,
      localX: touchList[i].pageX - localPositionRelativeToPage.x,
      localY: touchList[i].pageY - localPositionRelativeToPage.y,
      timeStamp,
    })
  }
  return touches
}

function getLocalClick(
  click: Types.MouseEvent,
  localOriginPositionRelativeToPage: Position
): Click {
  const timeStamp = Date.now()
  return {
    uid: timeStamp.toString(),
    timeStamp,
    localX:
      (click.pageX || click.clientX) - localOriginPositionRelativeToPage.x,
    localY:
      (click.pageY || click.clientY) - localOriginPositionRelativeToPage.y,
  }
}

function isMouseClick(event: Types.SyntheticEvent): event is Types.MouseEvent {
  return !('touches' in event)
}

function getTargetChange(
  proposal: MoveTouch,
  previousData: SAMModelData,
  data: SAMModelData
): TargetChange | undefined {
  // If it has the same target after a delay, it is a long press.
  const oldTouch = previousData.touches.find(
    ({ identifier }) => proposal.payload.identifier === identifier
  )
  const currentTouch = data.touches.find(
    ({ identifier }) => proposal.payload.identifier === identifier
  )
  if (oldTouch && currentTouch) {
    const oldTouchTargetId: string | undefined = getTouchedObjects(
      [oldTouch],
      previousData.objectLayouts
    )[0]?.targetId
    const currentTouchTargetId: string | undefined = getTouchedObjects(
      [currentTouch],
      data.objectLayouts
    )[0]?.targetId
    // Entered a target rules:
    // - the previous and current target are different
    // - the current target is defined.
    if (oldTouchTargetId !== currentTouchTargetId && !!currentTouchTargetId) {
      return {
        op: 'entered',
        prevTarget: oldTouchTargetId,
        target: currentTouchTargetId,
      }
    }
    // Exited a target rules:
    // - the previous and current target are different
    // - the previous target is defined.
    else if (oldTouchTargetId !== currentTouchTargetId && !!oldTouchTargetId) {
      return {
        op: 'exited',
        prevTarget: oldTouchTargetId,
        target: currentTouchTargetId,
      }
    }
  }
  return undefined
}
