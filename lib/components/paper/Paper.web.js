import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { shadows } from './style';
import { Styles } from '../../styles/createStyleSheet';
import { View } from '../view';
export default class Paper extends React.Component {
    get shadow() {
        return shadows.web[this.props.elevation || 0];
    }
    componentDidMount() {
        const element = findDOMNode(this.containerRef);
        element.style.boxShadow = this.shadow;
    }
    render() {
        const { children, square } = this.props;
        return (React.createElement(View, { ref: (comp) => this.containerRef = comp, style: [
                this.props.style,
                square
                    ? Styles.createViewStyle({
                        borderRadius: 0
                    })
                    : undefined
            ] }, children));
    }
}
//# sourceMappingURL=Paper.web.js.map