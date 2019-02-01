import * as React from 'react';
import { Animated, Styles } from 'reactxp';
import { ThemeContext } from '../../styles/theme';
import { View } from '../view';
import styles from './style';
class ProgressBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.animatedPercent = Animated.createValue(0.0);
        const value = this.limit(props.progress);
        this.animatedPercent = Animated.createValue(value);
        this.animatedStyle = Styles.createAnimatedViewStyle({
            transform: [{ scaleX: this.animatedPercent }]
        });
        this.animation = this.getAnimation(value, props.animationDuration || 0);
    }
    componentDidMount() {
        this.animation.start();
    }
    componentWillReceiveProps(newProps) {
        this.animation.stop();
        const value = this.limit(newProps.progress);
        this.animation = this.getAnimation(value, newProps.animationDuration || this.props.animationDuration || 0);
        this.animation.start();
    }
    render() {
        const { palette, style } = this.props;
        return (React.createElement(ThemeContext.Consumer, null, theme => {
            const stylesSheet = styles({ theme, palette, style });
            return (React.createElement(View, { style: stylesSheet.root },
                React.createElement(View, { style: stylesSheet.background }),
                React.createElement(View, { style: stylesSheet.top },
                    React.createElement(View, { style: stylesSheet.fill, animated: this.animatedStyle }))));
        }));
    }
    limit(value = 0) {
        return Math.min(1, Math.max(0, (value / 100)));
    }
    getAnimation(toValue, duration) {
        return Animated
            .timing(this.animatedPercent, {
            toValue,
            duration,
            easing: Animated.Easing.InOut()
        });
    }
}
export default ProgressBar;
//# sourceMappingURL=ProgressBar.js.map