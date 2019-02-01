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
import { Text } from 'reactxp';
import { ThemeContext } from '../../styles/theme';
export const TextComp = (_a) => {
    var { children, style } = _a, props = __rest(_a, ["children", "style"]);
    return (React.createElement(ThemeContext.Consumer, null, (theme) => (React.createElement(Text, Object.assign({ style: Object.assign({ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize, fontWeight: theme.typography.fontWeightLight }, style) }, props), children))));
};
export default TextComp;
//# sourceMappingURL=Text.js.map