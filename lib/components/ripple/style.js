import { Styles } from '../../styles/createStyleSheet';
import { darkShadow, lightShadow } from '../../styles/theme';
import { getLuminance } from '../../styles/colorManipulator';
export const containerStyle = function ({ isOnPaper, palette, theme }) {
    const backgroundColor = palette
        ? theme.palette[palette].main
        : isOnPaper
            ? theme.palette.type === 'light'
                ? '#000'
                : '#fff'
            : getLuminance(theme.palette.primary.main) >= .5
                ? '#000'
                : '#fff';
    const opacity = getLuminance(backgroundColor) >= .5
        ? darkShadow.hover
        : lightShadow.hover;
    return {
        root: Styles.createViewStyle({
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }),
        overlay: Styles.createViewStyle({
            flex: 1,
            backgroundColor,
            opacity,
        }),
        button: Styles.createViewStyle({
            flex: 1,
        })
    };
};
export const rippleStyle = function ({ x, y, isOnPaper, radius, theme, palette }) {
    const backgroundColor = palette
        ? theme.palette[palette].main
        : isOnPaper
            ? theme.palette.type === 'light'
                ? '#000'
                : '#fff'
            : getLuminance(theme.palette.primary.main) >= .5
                ? '#000'
                : '#fff';
    return {
        ripple: Styles.createViewStyle({
            position: 'absolute',
            width: radius * 2,
            height: radius * 2,
            left: x,
            top: y,
            backgroundColor,
            borderRadius: radius,
        })
    };
};
//# sourceMappingURL=style.js.map