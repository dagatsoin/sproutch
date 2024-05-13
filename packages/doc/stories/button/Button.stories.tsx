import { BorderImage, Button } from '@sproutch/ui'
import { View } from 'react-native'
import { Meta, StoryObj } from '@storybook/react';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

const meta: Meta<typeof Button> = {
  title: 'Button/Basic',
  component: Button,
  decorators: [(Story) => <View style={{
    flexDirection: 'row',
    flex:1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible'
  }}>
    <Story/>
  </View>]
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Palette: Story = {
  name: "Palette choice",
  args: {
    palette: "primary",
    label: "PRIMARY"
  }
}

export const Disabled: Story = {
  name: "Button can be disabled",
  args: {
    isDisabled: true,
    label: "Disabled"
  }
}

export const Elevation: Story = {
  args: {
    label: "Elevation",
    elevation: 4,
  }
}

export const WithIcon: Story = {
  args: {
    label: "With icon",
    iconSlot: iconStyle => (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      <FontAwesome style={iconStyle} name="search" />
    )
  }
}

export const Density: Story = {
  args: {
    isDense: true,
    variant: "contained",
    label: "Dense"
  }
}

export const Variant: Story = {
  name: "Variant choice",
  args: {
    variant: "outlined",
    label: "Out lined"
  }
}

export const WithBackground: Story = {
  name: "With background image",
  args: {
    style:{
      root: {
        margin: 8,
        height: 64,
        width: 200,
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
    label: "CONTACT",
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
    )
  }
}