var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Button, UserInterface, Platform } from 'reactxp';
import Ripple from './Ripple';
import { containerStyle } from './style';
import { View } from '../view';
import { ThemeContext } from '../../styles/theme';
import { Fade } from '../fade';
class RippleCreator extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            nextKey: 0,
            ripplesProps: [],
            isHover: false
        };
        this.processingOnPressInHandler = false;
        this.removeQueue = [];
    }
    render() {
        const { isOnPaper, onPress, palette } = this.props;
        return (React.createElement(ThemeContext.Consumer, null, theme => {
            const styleSheet = containerStyle({
                isOnPaper,
                palette,
                theme
            });
            return (React.createElement(View, { ref: (comp) => this.containerRef = comp, style: styleSheet.root },
                React.createElement(Fade, { isVisible: this.state.isHover },
                    React.createElement(View, { style: styleSheet.overlay })),
                React.createElement(Button, { disableTouchOpacityAnimation: true, onPress: (e) => onPress && onPress(e), onHoverStart: () => {
                        this.setState({ isHover: true });
                    }, onPressIn: this.onPressIn.bind(this), onPressOut: this.onPressOut.bind(this), onHoverEnd: () => {
                        this.setState({ isHover: false });
                        this.onPressOut();
                    }, onContextMenu: this.onPressOut.bind(this), style: styleSheet.button }, this.state.ripplesProps.map(props => (React.createElement(Ripple, Object.assign({ key: props.id }, props)))))));
        }));
    }
    onPressIn(e) {
        this.addRipple(e.nativeEvent);
    }
    onPressOut() {
        this.fadeNextRipple();
    }
    addRipple(event, cb = () => null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.processingOnPressInHandler = true;
            const rect = yield UserInterface.measureLayoutRelativeToWindow(this.containerRef);
            // Get the ripple layout
            const cursorX = RippleCreator.isWeb
                ? Math.round(event.clientX - rect.x)
                : Math.round(event.pageX - rect.x);
            const cursorY = RippleCreator.isWeb
                ? Math.round(event.clientY - rect.y)
                : Math.round(event.pageY - rect.y);
            const radiusFrom = Math.min(rect.width, rect.height) / 2;
            const posX = cursorX - radiusFrom;
            const posY = cursorY - radiusFrom;
            const radiusTo = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2));
            const { isOnPaper, palette } = this.props;
            this.setState(state => {
                return {
                    nextKey: state.nextKey + 1,
                    ripplesProps: [
                        {
                            id: state.nextKey,
                            x: posX,
                            y: posY,
                            radiusTo,
                            radiusFrom,
                            isFading: false,
                            isOnPaper,
                            palette,
                            onRippleEnd: this.onRippleEnd.bind(this)
                        },
                        ...state.ripplesProps,
                    ],
                };
            }, cb);
            // on slow mobile the onPressOut event comes befor the onPressIn because onPressIn is still busy with the layout measurement.
            // so we buffer all the remove actions to execute until the end of the onPressIn handler execution.
            this.removeQueue.forEach(remove => remove());
            this.removeQueue = [];
            this.processingOnPressInHandler = false;
        });
    }
    fadeNextRipple(cb) {
        const action = () => {
            const ripplesProps = this.state.ripplesProps
                .slice(0)
                .map((r, index, ripples) => {
                // Look if the next ripple in the array is already fading or if it the last ripple of the array
                // If so, the current ripple is the next to fade.
                // If not, don't change.
                return (!ripples[index + 1] || ripples[index + 1].isFading)
                    ? Object.assign({}, r, { isFading: true }) : r;
            });
            this.setState({
                ripplesProps
            }, cb);
        };
        if (this.processingOnPressInHandler) {
            this.removeQueue.push(action);
        }
        else
            action();
    }
    onRippleEnd() {
        this.setState({
            ripplesProps: this.state.ripplesProps.slice(0, this.state.ripplesProps.length - 1)
        });
    }
}
RippleCreator.isWeb = Platform.getType() === 'web';
export default RippleCreator;
//# sourceMappingURL=RippleGenerator.js.map