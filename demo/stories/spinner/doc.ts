export default `
### Import name
\`Spinner\`
### Usage
This component displays a animated spinner. It is just a wrapper of the ReactXP.ActivityIndicator
\`\`\`
<ProgressBar
  progress={30}
  animationDuration={200}
/>
\`\`\`
### Properties

#### color *optional*
\`type: string\`

The color of the indicator.

#### deferTime *optional*
\`type: number\`

Number of ms to wait before displaying

#### size *optional*
\`type: 'large' | 'medium' | 'small' | 'tiny'\`

Size of indicator (exact sizes are platform-specific)
### Other optional props
- style:
  - [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
  - [TransformStyle](https://microsoft.github.io/reactxp/docs/styles.html#transform-style-attributes)
  - [FlexboxStyle](https://microsoft.github.io/reactxp/docs/styles.html#flexbox-style-attributes)
`