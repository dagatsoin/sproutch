export default `
### Import name
\`ProgressBar\`
### Usage
This component displays a animated progress bar.
\`\`\`
<ProgressBar
  progress={30}
  animationDuration={200}
/>
\`\`\`
### Properties

#### progress *optional*
\`type: number\`

From 0 to 100, the value of the progression.

#### animationDuration *optional*
\`type: number\`

Time of transition between to \`progress\` values

#### palette *optional*
\`type: 'primary' | 'secondary'\`

The color of the progress indicator.

#### style *optional*
\`type: Partial<ProgressBarStyle>\`

You can pass a style object with thos keys to ovveride the default style:

\`\`\`  
{
  root: ViewStyle
  top: Types.ViewStyle
  background: ViewStyle
  fill: Types.ViewStyle
}
\`\`\`
`