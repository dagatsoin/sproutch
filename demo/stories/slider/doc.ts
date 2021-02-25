export default `
### Import name
\`Slider\`
### Usage
This component displays a Material Design Slider.

\`\`\`
<Slider style={{root: [{width: 100}]}}>
\`\`\`
### Properties

#### isAmount *optional*
\`type: boolean\`

If true, acts as an amount slider, contrasting the bar behind the cursor.
If false acts as a position cursor, the bar behind being full active.

### range
\`type: [number, number]\`

A tupple representing the start and end range of value

### value *optional*
\`type: number\`

The current value

### step
\`type: number\`

The step between two cursor position

#### isAmount *optional*
\`type: boolean\`


#### palette *optional*
\`type: "primary" | "secondary"\`

The theme palette.

### onChange *optional*
\`type: (value: number) => void\`

Fire when the value changes.

### style *optional*
\`type: SliderOverrideStyle = {
  baseSegment: StyleRuleSet<ViewStyle>
  activeSegment: StyleRuleSet<ViewStyle>
  cursor: StyleRuleSet<ViewStyle>
}\`

`