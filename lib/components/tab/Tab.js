import * as React from 'react';
import { tabStyle } from './styles';
import { ThemeContext } from '../../styles/theme';
import { Text } from '../text';
import { View } from '../view';
import { Ripple } from '../ripple';
class Tab extends React.Component {
    componentWillMount() {
        const { onWillMount = () => { } } = this.props;
        onWillMount(this.props.id);
    }
    componentDidMount() {
        this.onLayout(this.layout);
    }
    componentWillUnmount() {
        const { onUnmount = () => { } } = this.props;
        onUnmount(this.props.id);
    }
    render() {
        const { renderIcon, label, isActive = false, isDisable = false, hasTwoLines = false, mustGrow = false, palette, renderSlot, style, } = this.props;
        return (React.createElement(ThemeContext.Consumer, null, theme => {
            const styles = tabStyle({
                theme,
                palette,
                style,
                options: {
                    hasTwoLines,
                    isDisable,
                    isActive,
                    mustGrow,
                    hasIcon: !!renderIcon,
                    hasLabel: !!label,
                }
            });
            const { id, onClick } = this.props;
            return (React.createElement(View, { onLayout: this.onLayout.bind(this), style: styles.root },
                renderIcon && renderIcon(styles.icon),
                label && React.createElement(Text, { style: styles.label }, label),
                renderSlot && renderSlot(),
                React.createElement(Ripple, { onPress: () => !!onClick && onClick(id), palette: palette })));
        }));
    }
    onLayout(layout) {
        const { id, onTabLayout } = this.props;
        if (this.layout !== undefined &&
            this.layout.height === layout.height &&
            this.layout.width === layout.width &&
            this.layout.x === layout.x &&
            this.layout.y === layout.y)
            return;
        this.layout = layout;
        onTabLayout && onTabLayout({
            id,
            layout
        });
    }
}
export default Tab;
//# sourceMappingURL=Tab.js.map