import { BorderImage, CircleButton } from '@sproutch/core'
import { View } from 'react-native'
import { Meta, StoryObj } from '@storybook/react';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

const meta: Meta<typeof CircleButton> = {
  title: 'Core/Molecule/Button/Circle',
  component: CircleButton,
  decorators: [(Story) => <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible'
  }}>
    <Story/>
  </View>]
}

export default meta;
type Story = StoryObj<typeof CircleButton>;

export const Palette: Story = {
  name: "Palette choice",
  args: {
    palette: "primary",
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />,
  }
}

export const Disabled: Story = {
  name: "Can be disabled",
  args: {
    isDisabled: true,
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />,
  }
}

export const Elevation: Story = {
  args: {
    elevation: 4,
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />,
  }
}

export const Variant: Story = {
  name: "Variant choice",
  args: {
    variant: "outlined",
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />,
  }
}


export const WithBackground: Story = {
  name: "With background image",
  args: {
    style: {
      root: {
        margin: 8,
        borderRadius: 32,
      },
      content: {
        borderRadius: 32,
      },
      label: {
        color: '#FFE082',
      },
      icon: {
        color: '#FFE082',
      },
    },
    elevation: 10,
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />,
    backgroundSlot: () => (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BorderImage
          uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
          borderWidth={32}
          sliceWidth={127}
        />
      </View>
    ),
  }
}