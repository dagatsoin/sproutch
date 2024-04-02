import { ButtonStyleOverride } from './button/style'
import { PaperStyleOverride } from './paper/style'
import { TabBarStyleOverride, TabStyleOverride } from './tab'

export type Overridables = {
    button: ButtonStyleOverride
    paper: PaperStyleOverride
    tab: TabStyleOverride
    tabs: TabBarStyleOverride
}