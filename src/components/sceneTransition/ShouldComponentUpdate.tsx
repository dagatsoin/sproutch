import * as React from 'react'

type Props = {
  children: React.ReactNode
  shouldUpdate: boolean
}

export default class ShouldComponentUpdate extends React.Component<
  Props,
  Readonly<{}>
> {
  public shouldComponentUpdate(nextProps: Props) {
    return nextProps.shouldUpdate
  }

  public render() {
    return this.props.children
  }
}
