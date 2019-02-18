export default `
### Import name
\`SceneTransition\`
### Usage
This component is used where you want to make a transition between two scene. For example with a router or in a caroussel.
\`\`\`
<SceneTransition
  nextScene={nextScreen}
  delayRender={400}
  dummyScene={
    <View style={{ alignItems: 'center' }}>
      <Spinner size='small' color='#809'/>
    </View>
  }
/>
\`\`\`
### Properties

#### nextScene *optional*
\`type: React.ReactNode\`

Your next scene component.

#### delayRender *optional*
\`type: number\`

Amount of time while the dummyScene will be displayed. If ommitted, it will stick to the internal animation duration.

#### dummyScene *optional*
\`type: 'primary' | 'secondary'\`

The dummy scene to display while the transition is going on. Id ommitted, the scene will be rendered at the start of the transition.
`