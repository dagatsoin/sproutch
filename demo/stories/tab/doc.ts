export default `

This components needs \`TabBar\` and \Tab

### Import name
\`TabBar\` and \`Tab\`
### Usage
This component implements the Tab system of Material Design.
\`\`\`
<TabBar children = {
    setProps => (
      <>
        <Tab
          key={0}
          id="0"
          label="First tab label"
          {...setProps('0')}
        />
        <Tab
          key={1}
          id="1"
          label="Second tab label"
          {...setProps('1')}
        />
        <Tab
          key={2}
          id="2"
          label="Third tab label"
          {...setProps('2')}
        />
      </>
    )
  }
/>
\`\`\`
### Properties

#### activeTabId *optional*
\`type: string\`

The intitial active tab id. Use this if you want to active a tab on mount.

#### hasIconOnTop *optional*
\`type: boolean\`

Set to True if you want the icon displays on top of the label.

#### palette *optional*
\`type: 'primary' | 'secondary'\`

The color of the tab font.

Size of indicator (exact sizes are platform-specific)
#### style *optional*

Accept a style object to override the default style of the TabBar

\`\`\`
{
  root: ViewStyle
  wrapper: ViewStyle
  scrollIndicator: ViewStyle
  cursor: ViewStyle
  scrollView: ScrollViewStyle
}
\`\`\`

#### tabs
\`type: TabProps[]\`

This is here where you will generate the tabs. They can change dynamically. 

\`\`\`
TabProps = {
  id: string // unique tab id
  renderIcon?: ( // render function with in parameter a preset for the icon style
    style: Types.TextStyle
  ) => JSX.Element
  label?: string // the text
  isDisable?: boolean // prevent click on the icon
  slot?: JSX.Element // a slot to put some children, like a notification badge
  style?: Partial<TabStyle> // An object to override the default style. See below.
}
\`\`\`

The style props accepts this object type.

\`\`\`
{
  root: Types.ViewStyle
  icon: Types.TextStyle
  label: Types.TextStyle
}
\`\`\`

The complete tabs property used in this story:

\`\`\`
[
  {
    id: "0",
    label: text('First tab label', firstTabLabel),
    isDisable: boolean('Disabled', isDisable),
    slot: notification,
    renderIcon: iconStyle => (
        <>
          {boolean('With icon', hasIcon) && (
            <FontAwesome.default
              style={iconStyle}
              name="rocket"
              size={30}
              color="#900"
            />
          )}
        </>
      )
  },
  ...Array.from(Array(number('Tab number', tabNumber)))
      .map((_, i) => ({
        id: i + 1 + '',
        label: \`\${otherTabBarLabel} \${i + 1}\`,
        renderIcon: iconStyle => (
          <>
            {boolean('With icon', hasIcon) && (
              <FontAwesome.default
                style={iconStyle}
                name="check"
                size={30}
                color="#900"
              />
            )}
          </>
        )
      }))
  ]
\`\`\`

#### renderCustomCursor *optional*
\`\`\`
  type: (
    tabLayout: LayoutInfo, // The actual active tab layout
    barLayout: LayoutInfo, // The Tabar layout
    theme: Theme<any, any> // Your theme
  ) => JSX.Element | JSX.Element[]
\`\`\`

Use this render props if you want to customize the cursor.

Exemple: A cursor fading depending on this position in the tabs bar

\`\`\`
function renderCustomCursor(
  { x }: LayoutInfo,
  { width: barWidth }: LayoutInfo,
  theme: DefaultTheme
) {
  return (
    <View
      style={Styles.createViewStyle({
        borderRadius: 1,
        height: 4,
        backgroundColor: colorManipulator.fade(
          theme.business.warning.main,
          Math.max(x / barWidth, 0.1)
        ),
        transform: [{ scaleY: 4 }],
      })}
    />
  )
}
\`\`\`

#### customCursorAnimation *optional*
\`\`\`
  type: (
    {
      scaleX,
      scaleY,
      translateY,
      rotateZ
    }: {  // the animated values used in the cursor animation,
      scaleX,
      scaleY,
      translateY,
      rotateZ
    }
    {
      width
    }: { // the new active tab width
      width: number
    },
    theme: Theme // Your theme
  )\`
\`\`\`

\`\`\`
(
  { scaleX, scaleY, translateY, rotateZ },
  { width },
  theme
) => ({
  scaleX: Animated.sequence([
    Animated.timing(scaleX, {
      toValue: 0,
      duration: 100,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(scaleX, {
      toValue: width - theme.spacing * 2,
      duration: 200,
      easing: Animated.Easing.In(),
    }),
  ]),
  scaleY: Animated.sequence([
    Animated.timing(scaleY, {
      toValue: 30,
      duration: 100,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(scaleY, {
      toValue: 4,
      duration: 200,
      easing: Animated.Easing.In(),
    }),
  ]),
  translateY: Animated.sequence([
    Animated.timing(translateY, {
      toValue: -30,
      duration: 50,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 50,
      easing: Animated.Easing.In(),
    }),
  ]),
  rotate: Animated.sequence([
    Animated.timing(rotate, {
      toValue: 180,
      duration: 50,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(rotate, {
      toValue: 0,
      duration: 50,
      easing: Animated.Easing.In(),
    }),
  ]),
})

\`\`\`


#### leftScrollButton
\`type: ()) => JSX.Element | JSX.Element[]\`

Slot for the left scroll button

Example:

\`\`\`
<View
  style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <FontAwesome.default name="chevron-left" size={16} color="#ddd" />
</View>
\`\`\`

#### rightScrollButton
\`type: () => JSX.Element | JSX.Element[]\`

Slot for the right scroll button

Example:

\`\`\`
<View
  style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <FontAwesome.default name="chevron-right" size={16} color="#ddd" />
</View>
\`\`\`

#### isFrozen *optional*
\`type: boolean\`

Block scroll and tab action if true.

#### onChange *optional*
\`type: (tabId: string) => void\`

Callback on tab change. This is triggered before the cursor animation.

#### onPressActiveTab *optional*
\`type: () => void\`

Callback on the active tab press.
`