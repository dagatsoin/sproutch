import { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { LayoutRectangle } from 'react-native';

export function componentDidMount(effect: React.EffectCallback) {
    return useEffect(effect, [])
}

export function measureLayoutRelativeToWindow(component: React.Component<unknown, unknown>): Promise<LayoutRectangle> {
    return new Promise((resolve, reject) => {
        let componentDomNode: HTMLElement | null = null;

        try {
            componentDomNode = ReactDOM.findDOMNode(component) as HTMLElement | null;
            const componentBoundingRect = componentDomNode!.getBoundingClientRect();
    
            resolve({
                x: componentBoundingRect.left,
                y: componentBoundingRect.top,
                width: componentBoundingRect.width,
                height: componentBoundingRect.height,
            })
        } catch {
            reject("measureLayoutRelativeToWindow failed")
        }
    })
}