var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Animated, Image, Platform, View as RNView, Styles, } from 'reactxp';
import { imageBackgroundStyle } from './style';
export default class View extends React.Component {
    componentDidMount() {
        const { backgroundImage } = this.props;
        if (backgroundImage !== undefined) {
            const { capInsets } = backgroundImage;
            if (capInsets !== undefined) {
                if (Platform.getType() === 'web') {
                    const element = findDOMNode(this.ninePatchesRef);
                    element.setAttribute('style', imageBackgroundStyle(backgroundImage));
                }
            }
        }
    }
    render() {
        const _a = this.props, { style, animated } = _a, props = __rest(_a, ["style", "animated"]);
        return animated === undefined
            ? (React.createElement(RNView, Object.assign({ style: style }, props), this.renderChildren()))
            : (React.createElement(Animated.View, Object.assign({ style: [
                    style,
                    animated,
                ] }, props), this.renderChildren()));
    }
    renderChildren() {
        const { children, backgroundImage } = this.props;
        return backgroundImage
            ? (React.createElement(RNView, { style: Styles.createViewStyle({ flex: 1 }) },
                backgroundImage.capInsets
                    ? this.render9PatchesImage(backgroundImage)
                    : this.renderBackgroundImage(backgroundImage),
                children))
            : children;
    }
    render9PatchesImage(backgroundImage) {
        const isWeb = Platform.getType() === 'web';
        const { capInsets } = backgroundImage;
        if (isWeb && capInsets) {
            return (React.createElement(RNView, { ref: (comp) => this.ninePatchesRef = comp }));
        }
        else {
            return React.createElement(React.Fragment, null);
        }
    }
    renderBackgroundImage(backgroundImage) {
        return (React.createElement(RNView, { style: {
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                display: 'flex',
            } },
            React.createElement(Image, { style: {
                    flex: 1,
                }, resizeMode: backgroundImage.resizeMode, source: backgroundImage.uri })));
    }
}
//# sourceMappingURL=View.js.map