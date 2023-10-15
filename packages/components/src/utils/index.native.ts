/**
 * UserInterface.tsx
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * RN implementation of the ReactXP interfaces related to
 * UI (layout measurements, etc.).
 */

import { LayoutRectangle, View } from 'react-native';

export function measureLayoutRelativeToWindow(view: View): Promise<LayoutRectangle> {
    return new Promise(function(resolve) {
        view.measure((
            _x,
            _y,
            width,
            height,
            pageX,
            pageY,
         ) => resolve({
            x: pageX,
            y: pageY,
            width,
            height,
         }));
    })
}