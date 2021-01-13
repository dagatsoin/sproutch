export default function collapseFactory(isInit?: boolean) {
  return {
    initialAnimatedValues: {
      rotateX: isInit ? 90 : 0
    },
    transitionValues: {
      entering: {
        rotateX: 0
      },
      exiting: {
        rotateX: 90
      }
    }
  };
}
