export default `
### Import name
\`SceneTransition\`
### Usage
This component is used where you want to make a transition between two scene. For example with a router or in a caroussel.

** Important: ** you will need to set \`display: flex\` and and a height to the parent or the scene.

#### Use with basic component
\`\`\`
<div style={{
  display: 'flex',
  height: '300px'
}}>
  <AnimatedTransition
    clean
    key={activeId}
  >
    {activeId === 'section0' && <Text>Section 0</Text>}
    {activeId === 'section1' && <Text>Section 1</Text>}
    {activeId === 'section2' && <Text>Section 2</Text>}  
  </AnimatedTransition>
</div>
\`\`\`

#### Use with React Router:
You can use SceneTransition with the react router Switch component. Make sure to pass the location props to the switch.
Otherwize the previous component won't be display during its exit.

\`\`\`
<Route render={({location}) => (
  <Scene
    render={
      ()=>(
        <Switch location={location}>
          <Route path="/profile" component={() => <Text>Profile</Text>} />
          <Route path="/portfolio" component={() => <Text>Portfolio</Text>} />
          <Route path="/contact" component={() => <Text>Contact</Text>} />
          <Redirect to="/profile" />
        </Switch>
      )
    }
  />
)}
\`\`\`

/>

### Properties

#### children
\`type: React.ReactNode\`

The children who change.

#### timeout (optional)
\` number \`
the duration of the transition. Default is 300ms.

#### id
\`string | number | undefined\`
A unique id to discriminate children. This value must change between
each transition.
The value can be first at undefined but must be set to trigger the first
transition (case of React Router location.key)

#### clean (optional)
Use when you want to remove the old children from the component tree.
Use case : screen transition.

#### animation
\`\`\`
  (isInit: boolean) => {
    initialAnimatedValues: {
      borderRadius?: number
      backgroundColor?: number
      opacity?: number
      perspective?: number
      rotateX?: number
      rotateY?: number
      rotateZ?: number
      scaleX?: number
      scaleY?: number
      translateX?: number
      translateY?: number
    },
    transitionValues: {
      entering?: {
        ...
        translateX: number
        ...
      },
      entered?: {
        ...
        translateX: number
        ...
      },
      exiting?: {
        ...
        translateX: number
        ...
      },
      exited?: {
        ...
        translateX: number
        ...
      }
    },
  }
\`\`\`

The animation behavior factory. A function which takes a isInit boolean
as argument (when the transition is rendering for the first time) and returns
a declarative animation.
The first part of the returned value is \`initialAnimatedValues\`. It describes the value
of the properties to animate at their initial state.
The second part of the returned value is \`transitionValues\` which descibes, for each transition status,
the value of the animated properties.
Note that you need to declare all the values used in the transition status in the \`initialAnimatedValues\`
otherwize, the animated properties won't be applied.
`