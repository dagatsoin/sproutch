var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Platform, UserInterface } from 'reactxp';
import { View } from '../view';
class LinearGradient extends React.PureComponent {
    render() {
        const { style, children } = this.props;
        return (React.createElement(View, { style: style, 
            // tslint:disable-next-line: jsx-no-bind
            onLayout: this.measure.bind(this), ref: (comp) => this.rootRef = comp },
            React.createElement(View, { ref: (comp) => this.backgroundImageRef = comp }),
            children));
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const rect = yield UserInterface.measureLayoutRelativeToWindow(this.rootRef);
            this.oldWidth = rect.width;
            this.oldHeight = rect.height;
            this.updateLayout({
                width: rect.width,
                height: rect.height,
            });
        });
    }
    updateLayout(dimensions) {
        if (Platform.getType() === 'web') {
            [findDOMNode(this.backgroundImageRef)]
                .map(e => {
                const style = this.getStyle(dimensions);
                e.setAttribute('style', style);
            });
        }
    }
    measure(e) {
        if (e.width !== this.oldWidth && e.height !== this.oldHeight) {
            this.oldWidth = e.width;
            this.oldHeight = e.height;
            this.updateLayout({
                width: e.width,
                height: e.height,
            });
        }
    }
    getAngle({ width, height }) {
        // Math.atan2 handles Infinity
        const { start = { x: 0, y: 0 }, end = { x: 1, y: 0 } } = this.props;
        const angle = Math.atan2(width * (end.y * 100 - start.y * 100), height * (end.x * 100 - start.x * 100)) + Math.PI / 2;
        return angle + 'rad';
    }
    get locations() {
        return this.props.locations && this.props.locations.length === this.props.colors.length
            ? this.props.locations
            : this.props.colors.map((_c, i, colors) => i / (colors.length - 1));
    }
    get colors() {
        const locations = this.locations;
        return this.props.colors
            .map((color, index) => {
            const location = locations[index];
            let locationStyle = '';
            if (location) {
                locationStyle = ' ' + location * 100 + '%';
            }
            return color + locationStyle;
        })
            .join(',');
    }
    getStyle(dimensions) {
        return `
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(${this.getAngle(dimensions)}, ${this.colors});
    `;
    }
}
export default LinearGradient;
//# sourceMappingURL=LinearGradient.js.map