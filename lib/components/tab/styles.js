import { Styles } from '../../styles/createStyleSheet';
import { override } from '../../styles/theme';
import { fade } from '../../styles/colorManipulator';
import { Platform } from 'reactxp';
export const tabStyle = function ({ theme, palette, style = {}, options, }) {
    const tabHeight = options && options.hasTwoLines
        ? 72
        : 48;
    const tabMinWidth = 90;
    const tabMaxWidth = 360;
    const iconSize = 3 * theme.spacing;
    const tabColor = palette === undefined || palette === ''
        ? fade(theme.palette.primary.contrastText, 0.7)
        : theme.palette[palette].main;
    const tabActiveColor = palette === undefined || palette === ''
        ? theme.palette.primary.contrastText
        : theme.palette[palette].main;
    const tabDisabledColor = palette === undefined || palette === ''
        ? fade(theme.palette.primary.contrastText, 0.5)
        : theme.palette.text.disabled;
    const twoLinesPadding = theme.spacing * 1.5;
    return {
        root: Styles.createViewStyle(Object.assign({ height: tabHeight, minWidth: tabMinWidth, maxWidth: tabMaxWidth }, (!!options && !options.mustGrow && {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: '100%'
        }), { paddingHorizontal: 16, paddingVertical: !!options && options.hasTwoLines
                ? twoLinesPadding
                : undefined, justifyContent: !!options && options.hasTwoLines
                ? 'space-between'
                : 'center', alignItems: 'center', flexDirection: !!options && options.hasTwoLines
                ? 'column'
                : 'row', cursor: 'pointer' }, override(theme.overrides, 'tab', 'root'), !!options && options.hasIcon
            ? override(theme.overrides, 'tab', 'hasIcon')
            : style.hasIcon, !!options && options.hasLabel
            ? override(theme.overrides, 'tab', 'hasLabel')
            : style.hasLabel, style.root)),
        icon: Styles.createTextStyle(Object.assign({ justifyContent: 'center' }, !!options && options.hasLabel && {
            margin: 0
        }, { fontSize: iconSize, textAlign: 'center', color: tabColor }, !!options && options.isActive && {
            color: tabActiveColor
        }, !!options && options.isDisable && {
            color: tabDisabledColor
        })),
        label: Styles.createTextStyle(Object.assign({ margin: 0, paddingLeft: !!options && !options.hasTwoLines && options.hasIcon
                ? theme.spacing
                : 0, textAlign: 'center', fontSize: 14, color: tabColor }, !!options && options.isActive && {
            color: tabActiveColor
        }, !!options && options.isDisable && {
            color: tabDisabledColor
        })),
    };
};
export const tabsBarStyle = function ({ palette, theme, style = {}, options, }) {
    const tabHeight = options && options.hasTwoLines
        ? 72
        : 48;
    const tabBackgroundColor = palette === undefined || palette === ''
        ? theme.palette.primary.main
        : theme.palette.background.default;
    const paddingHorizontal = !!options && options.isScrollEnabled
        ? 52
        : 0;
    const cursorColor = palette === undefined || palette === ''
        ? theme.palette.secondary.main
        : theme.palette[palette].main;
    return {
        root: Styles.createViewStyle(Object.assign({ height: tabHeight, flex: 1, backgroundColor: tabBackgroundColor, paddingHorizontal }, override(theme.overrides, 'tabs', 'root'), style.root)),
        wrapper: Styles.createViewStyle({
            flexDirection: 'row',
            overflow: 'visible',
        }),
        leftIndicator: Styles.createViewStyle({
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: paddingHorizontal,
            cursor: 'pointer',
        }),
        rightIndicator: Styles.createViewStyle({
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: paddingHorizontal,
            cursor: 'pointer',
        }),
        cursor: Styles.createViewStyle({
            position: 'absolute',
            width: 1,
            top: tabHeight - 2,
            right: 0,
            left: 0,
            height: 2,
            backgroundColor: cursorColor,
        }),
        scrollView: Styles.createScrollViewStyle(Object.assign({ marginBottom: -20 }, (Platform.getType() === 'web' && { display: 'inline-flex' }) // To get the tab width fit their content
        )),
        // Custom values
        paddingHorizontal,
    };
};
//# sourceMappingURL=styles.js.map