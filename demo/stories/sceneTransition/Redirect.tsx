import * as React from 'react'
import {
  Redirect,
  RedirectProps,
  Route,
} from 'react-router'

type Props = RedirectProps

export default function(props: Props) {
  return (
    <Route>
      {({history}) => {
        const to = props.to
        const isSameRouteAsCurrent = (history.location.pathname + history.location.search) === to

        return isSameRouteAsCurrent ? <></> : <Redirect {...props} />
      }}
    </Route>
  )
}
