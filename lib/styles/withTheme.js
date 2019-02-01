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
import { ThemeContext } from './theme';
export const withTheme = () => (Component) => (props) => {
    const { innerRef } = props, rest = __rest(props, ["innerRef"]);
    return (React.createElement(ThemeContext.Consumer, null, theme => React.createElement(Component, Object.assign({ theme: theme, ref: innerRef }, rest))));
};
//# sourceMappingURL=withTheme.js.map