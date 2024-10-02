import * as React from 'react'
import { Image } from 'reactxp'

import { Grid } from '@sproutch/ui'

type State = {}

export default class extends React.Component<{}, State> {
  public state: State = {}
  
  public render() {
    return (
      <Grid
        style={{alignSelf: 'stretch'}}
        items={[{
          key: "0",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "1",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "2",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "3",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "4",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "5",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "6",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "7",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "8",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }, {
          key: "9",
          image: <Image style={{flex: 1}} source="https://i.ibb.co/Yhs3Ff5/btn-bg.png"/>,
          title: "Titre"
        }]}
      />
    )
  }
}
