import {
  BackgroundImage,
  CircleButton,
  InjectedTheme,
  List,
  ListItem,
  View,
  withTheme,
} from '@sproutch/ui'
import { boolean, select } from '@storybook/addon-knobs'
import * as React from 'react'
import { Image } from 'reactxp'
// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

const renderLeftIcon = style => (
  <FontAwesome.default
    name="star"
    style={{
      ...style,
      position: 'relative',
    }}
  />
)
const renderLeftCircleIcon = style => (
  <FontAwesome.default
    name="star"
    style={{
      ...style,
      position: 'relative',
    }}
  />
)
const renderRightIcon = style => (
  <FontAwesome.default
    name="ellipsis-v"
    style={{
      ...style,
      position: 'relative',
    }}
  />
)

export default withTheme(function({
  palette = (select(
    'Palette',
    [undefined as any, 'primary', 'secondary'],
    'primary'
  ) as unknown as 'primary' | 'secondary'),
  hasLeftIcon = boolean('Has left icon', false),
  hasLeftCircleIcon = boolean('Has left circle icon', false),
  hasLeftCircleImage = boolean('Has left circle image', false),
  hasLeftSquareImage = boolean('Has left square image', false),
  hasSecondaryAction = boolean('Has secondary action', false),
  hasTwoLinesText = boolean('Has two lines text', false),
  hasMeta = boolean('Has meta', false),
  hasText = boolean('Has text', false),
  theme = {},
}: {
  palette?: 'primary' | 'secondary'
  hasLeftIcon?: boolean
  hasLeftCircleIcon?: boolean
  hasLeftCircleImage?: boolean
  hasLeftSquareImage?: boolean
  hasSecondaryAction?: boolean
  hasTwoLinesText?: boolean
  hasMeta?: boolean
  hasText?: boolean
} & InjectedTheme<any>) {
  const rightSlot = (
    <CircleButton
      radius={16}
      variant="text"
      style={{
        icon: {
          color: theme.palette.text.secondary,
        },
      }}
      palette={palette}
      iconSlot={renderRightIcon}
      onPress={alert}
    />
  )
  return (
    <List
      style={{
        root: {
          alignSelf: 'stretch',
        },
      }}
    >
      <ListItem
        key="100"
        palette={palette}
        rightSlot={hasSecondaryAction ? rightSlot : undefined}
        title="The cake is a lie"
        renderLeftIcon={hasLeftIcon ? renderLeftIcon : undefined}
        renderLeftCircleIcon={
          hasLeftCircleIcon ? renderLeftCircleIcon : undefined
        }
        circleImageSlot={
          hasLeftCircleImage && (
           <>
              <BackgroundImage
                uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
                resizeMode="cover"
              />
              <View
                style={{
                  width: 28,
                  height: 28,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  overflow: 'hidden'
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source="https://upload.wikimedia.org/wikipedia/commons/7/71/Pixelart-tv-iso-2.png"
                />
              </View>
            </>
          )
        }
        squareImageSlot={hasLeftSquareImage && (
          <Image
            style={{
              flex: 1
            }}
            source="http://www.easy-birthday-cakes.com/images/companion-cube-cake-21584741.jpg"
          />
        )}
        meta={hasMeta ? 'day 100' : undefined}
        text={
          hasText
            ? 'I am still stuck, Glados watching my back. I can feel it. This is not a game.'
            : undefined
        }
        hasTwoLinesText={hasTwoLinesText}
      />
      <ListItem
        key="101"
        palette={palette}
        rightSlot={hasSecondaryAction ? rightSlot : undefined}
        title="The cake is a lie"
        renderLeftIcon={hasLeftIcon ? renderLeftIcon : undefined}
        renderLeftCircleIcon={
          hasLeftCircleIcon ? renderLeftCircleIcon : undefined
        }
        circleImageSlot={
          hasLeftCircleImage && (
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source="https://upload.wikimedia.org/wikipedia/commons/7/71/Pixelart-tv-iso-2.png"
            />
          )
        }
        squareImageSlot={hasLeftSquareImage && (
          <Image
            style={{
              flex: 1
            }}
            source="http://www.easy-birthday-cakes.com/images/companion-cube-cake-21584741.jpg"
          />
        )}
        meta={hasMeta ? 'day 101' : undefined}
        text={
          hasText
            ? 'I am still stuck, Glados watching my back. I can feel it. This is not a game.'
            : undefined
        }
        hasTwoLinesText={hasTwoLinesText}
      />
      <ListItem
        key="102"
        palette={palette}
        rightSlot={hasSecondaryAction ? rightSlot : undefined}
        title="The cake is a lie"
        renderLeftIcon={hasLeftIcon ? renderLeftIcon : undefined}
        renderLeftCircleIcon={
          hasLeftCircleIcon ? renderLeftCircleIcon : undefined
        }
        circleImageSlot={
          hasLeftCircleImage && (
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source="https://upload.wikimedia.org/wikipedia/commons/7/71/Pixelart-tv-iso-2.png"
            />
          )
        }
        squareImageSlot={hasLeftSquareImage && (
          <Image
            style={{
              flex: 1
            }}
            source="http://www.easy-birthday-cakes.com/images/companion-cube-cake-21584741.jpg"
          />
        )}
        meta={hasMeta ? 'day 102' : undefined}
        text={
          hasText
            ? 'I am still stuck, Glados watching my back. I can feel it. This is not a game.'
            : undefined
        }
        hasTwoLinesText={hasTwoLinesText}
      />
      <ListItem
        key="103"
        palette={palette}
        rightSlot={hasSecondaryAction ? rightSlot : undefined}
        title="The cake is a lie"
        renderLeftIcon={hasLeftIcon ? renderLeftIcon : undefined}
        renderLeftCircleIcon={
          hasLeftCircleIcon ? renderLeftCircleIcon : undefined
        }
        circleImageSlot={
          hasLeftCircleImage && (
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source="https://upload.wikimedia.org/wikipedia/commons/7/71/Pixelart-tv-iso-2.png"
            />
          )
        }
        squareImageSlot={hasLeftSquareImage && (
          <Image
            style={{
              flex: 1
            }}
            source="http://www.easy-birthday-cakes.com/images/companion-cube-cake-21584741.jpg"
          />
        )}
        meta={hasMeta ? 'day 103' : undefined}
        text={
          hasText
            ? 'I am still stuck, Glados watching my back. I can feel it. This is not a game.'
            : undefined
        }
        hasTwoLinesText={hasTwoLinesText}
        isLast
      />
    </List>
  )
})
