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
  <SceneTransition
    render={() => <NextScene/>}
    delayRender={400}
    dummyScene={
      <View style={{ alignItems: 'center' }}>
        <Spinner size='small' color='#809'/>
      </View>
    }
  />
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

#### scene *optional*
\`type: React.ReactNode\`

Your next scene component.

#### delayRender *optional*
\`type: number\`

Amount of time while the dummyScene will be displayed. If ommitted, it will stick to the internal animation duration.

#### dummyScene *optional*
\`type: 'primary' | 'secondary'\`

The dummy scene to display while the transition is going on. Id ommitted, the scene will be rendered at the start of the transition.

#### sceneContainerSlot *optional*
\`type: React.ReactNode\`

A slot to inject some components in the current and next scene container. For example to set a \`BackgroundImage\` behind the scene.
`