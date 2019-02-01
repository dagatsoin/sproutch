import { Styles } from '../../styles/createStyleSheet';
import { override } from '../../styles/theme';
export default function ({ theme, palette = 'primary', style = {}, }) {
    return {
        root: Styles.createViewStyle(Object.assign({ overflow: 'hidden', flex: 1, minHeight: theme.spacing }, override(theme.overrides, 'progressBar', 'root'), style.root)),
        top: Styles.createViewStyle(Object.assign({ position: 'absolute', borderRadius: 16, top: 0, left: 0, bottom: 0, right: 0 }, override(theme.overrides, 'progressBar', 'top'), style.top)),
        fill: Styles.createViewStyle(Object.assign({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transformOrigin: 'left', backgroundColor: theme.palette[palette].main }, override(theme.overrides, 'progressBar', 'fill'), style.fill)),
        background: Styles.createViewStyle(Object.assign({ flex: 1, backgroundColor: theme.palette.background.appBar }, override(theme.overrides, 'progressBar', 'background'), style.background)),
    };
}
//# sourceMappingURL=style.js.map