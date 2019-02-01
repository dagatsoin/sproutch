import React from 'react';
import { Animated, Styles } from 'reactxp';
import { View } from '../view';
import fadeStyle from './style';
export default class Fade extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isVisible: false };
        this.animatedOpacity = Animated.createValue(0);
        const { isAnimatedOnMount, isVisible } = props;
        this.duration = props.duration || 15;
        const opacityFrom = !!isAnimatedOnMount
            ? isVisible
                ? 0
                : 1
            : isVisible
                ? 1
                : 0;
        const opacityTo = isAnimatedOnMount
            ? isVisible
                ? 1
                : 0
            : isVisible
                ? 0
                : 1;
        this.state.isVisible = isVisible;
        this.animatedOpacity.setValue(opacityFrom);
        this.animatedStyle = Styles.createAnimatedViewStyle({
            opacity: this.animatedOpacity
        });
        this.animation = this.getAnimation(opacityTo);
    }
    componentDidMount() {
        if (this.props.isAnimatedOnMount) {
            this.animation.start(this.onAnimationEnd.bind(this));
        }
    }
    render() {
        const { isVisible } = this.state;
        const { children, style } = this.props;
        return (React.createElement(View, { style: [fadeStyle, style], animated: this.animatedStyle }, isVisible && children));
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.isVisible !== prevProps.isVisible) {
            this.animation.stop();
            this.animation = this.getAnimation(this.props.isVisible
                ? 1
                : 0);
            const childrenShouldBeVisible = this.props.isVisible || (!this.props.isVisible && this.state.isVisible);
            this.setState({
                isVisible: childrenShouldBeVisible
            }, () => {
                this.animation.start(this.onAnimationEnd.bind(this));
            });
        }
    }
    onAnimationEnd({ finished }) {
        if (finished && this.props.onAnimationEnd) {
            this.props.onAnimationEnd();
        }
    }
    getAnimation(toValue) {
        return Animated
            .timing(this.animatedOpacity, {
            toValue,
            duration: this.duration,
            easing: Animated.Easing.Linear()
        });
    }
}
//# sourceMappingURL=Fade.js.map