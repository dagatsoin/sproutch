import { LayoutRectangle, View } from 'react-native';

export function measureLayoutRelativeToWindow(comp: View): Promise<LayoutRectangle> {
    return new Promise((resolve, reject) => {
        try {
            comp.measureInWindow((x, y, width, height) => resolve({
                x,
                y,
                width,
                height,
            }));
    
            
        } catch {
            reject("measureLayoutRelativeToWindow failed")
        }
    })
}