import * as React from 'react';
import { rippleStyle } from './style';
import { View } from '../view';
import { ThemeContext, darkShadow } from '../../styles/theme';
import { Styles, Animated } from 'reactxp';
//const fadeInDuration = 75
const fadeOutDuration = 150;
const scaleDuration = 225;
const easing = Animated.Easing.CubicBezier(.4, 0, .2, 1);
class Ripple extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.animatedScale = Animated.createValue(1);
        this.animatedOpacity = Animated.createValue(darkShadow.press);
        this.runningAnimation = false;
    }
    componentWillMount() {
        this.animatedStyle = Styles.createAnimatedViewStyle({
            transform: [{ scale: this.animatedScale }],
            opacity: this.animatedOpacity
        });
    }
    componentDidMount() {
        const { radiusFrom, radiusTo } = this.props;
        this.runningAnimation = true;
        Animated
            .timing(this.animatedScale, {
            toValue: radiusTo / radiusFrom,
            duration: scaleDuration,
            easing
        }).start(this.onAnimateRadiusEnd.bind(this));
    }
    componentWillReceiveProps(newProps) {
        const { isFading: fading } = this.props;
        if (newProps.isFading !== fading && !this.runningAnimation) {
            this.fadeOut();
        }
    }
    render() {
        return (React.createElement(ThemeContext.Consumer, null, theme => {
            const { isOnPaper, palette, radiusFrom, x, y } = this.props;
            const styleSheet = rippleStyle({
                x,
                y,
                isOnPaper,
                radius: radiusFrom,
                palette,
                theme
            });
            return (React.createElement(View, { style: [styleSheet.ripple, Styles.createViewStyle({
                        left: x - 5,
                        top: y - 5,
                    })], animated: this.animatedStyle }));
        }));
    }
    onAnimateRadiusEnd() {
        this.runningAnimation = false;
        if (this.props.isFading) {
            this.fadeOut();
        }
    }
    fadeOut() {
        if (this.runningAnimation)
            return; // already fading
        this.runningAnimation = true;
        Animated
            .timing(this.animatedOpacity, {
            toValue: 0,
            duration: fadeOutDuration,
            easing: Animated.Easing.Linear()
        }).start(this.props.onRippleEnd);
    }
}
export default Ripple;
//# sourceMappingURL=Ripple.js.map