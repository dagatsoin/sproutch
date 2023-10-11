import { UserInterface } from 'reactxp'

const { width } = UserInterface.measureWindow()

export default function slideFactory(isInit?: boolean) {
  return {
    initialAnimatedValues: {
      translateX: isInit ? width : 0,
    },
    transitionValues: {
      entering: {
        translateX: 0,
      },
      exiting: {
        translateX: -width,
      },
    },
  }
}
