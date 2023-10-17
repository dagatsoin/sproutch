export default `
### Import name
\`Grid\`
### Usage
This component displays a basic grid. This is far to be a complete implementation of the material specs for now.
No icon support, title is always below.
This is not a CSS grid, you will be responsible to manually compute the height/width needed for the item.
\`\`\`
<Grid
style={{alignSelf: 'stretch'}}
items={[{
  image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
  title: "Titre"
}, {
  image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
  title: "Titre"
}, {
  image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
  title: "Titre"
}, {
  image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
  title: "Titre"
}, {
  image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
  title: "Titre"
}
/>
\`\`\`
### Properties

### Items
\`type: Array<{
  image: React.ReactNode,
  title: React.ReactNode,
  mainAction: () => void
}>\`

#### padding *optional*
\`type: number\`

The gutter size.

### itemHeight *optional*
\`type: number\`

Grid item height, including the title (which is 28px height)

### itemWidth *optional*
\`type: number\`

Grid item width
`