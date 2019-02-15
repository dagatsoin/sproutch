import {  withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import * as React from 'react'

import markdown from './doc'
import Story from './story.common'

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Ripple', () => <Story/>, { notes: {markdown}})
  
// import { Paper, Ripple, Text, View } from '@sproutch/ui'
// import { withKnobs } from '@storybook/addon-knobs'
// import { storiesOf } from '@storybook/react-native'
// import * as React from 'react'
// import RN, { StyleSheet, View as RNView } from 'react-native'
// import { Button, Styles, View as RXView } from 'reactxp'

// const styleSheet = StyleSheet.create({
//   parent: {
//     width: 232,
//     height: 132,
//     backgroundColor: '#555'
//   },
//   child: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#eee'
//   }
// })

// storiesOf('Sproutch', module)
//   .addDecorator(withKnobs)
//   .add('Ripple', function() {
//     return (
//       <>
//         <RXView
//           style={styleSheet.parent}
//           //onPress={(e) => console.log('parent', e)}
//           onStartShouldSetResponder={(e) => {
//             console.log('should parent', (e as any).isPropagationStopped())
//             return true
//           }}
//         >
//           <RXView
//             style={styleSheet.child}
//             onPress={(e) => console.log('child', e)}
//             onStartShouldSetResponder={(e) => {
//               console.log('should parent', (e as any).isPropagationStopped())
//               return true
//             }}
//           />
//         </RXView>

        
//       </>
//     )
//   } as any)
