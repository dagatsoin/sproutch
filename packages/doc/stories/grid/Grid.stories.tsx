import { Grid } from '@sproutch/core'
import { Image, Text } from 'react-native'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Grid> = {
  title: 'Core/Layout/Grid',
  component: Grid,
}

export default meta

type Story = StoryObj<typeof Grid>;

export const Basic: Story = {
  args: {
    style:{alignSelf: 'stretch'},
    items: [{
      key: "0",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "1",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "2",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "3",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text>
    }, {
      key: "4",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "5",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "6",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "7",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "8",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }, {
      key: "9",
      image: <Image style={{flex: 1}} source={{uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"}}/>,
      title: <Text>Title</Text> 
    }],
  }
}