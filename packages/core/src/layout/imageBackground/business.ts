import { BackgroundSize } from "./BackgroundImageProps"

export function getSize(
    containerRect: { width: number, height: number, x: number, y: number },
    imageOriginalSize: { width: number, height: number },
    wantedSize?: BackgroundSize,
): [number, number] {
    switch (wantedSize) {
        case undefined:
        case 'none':
            return [imageOriginalSize.width, imageOriginalSize.height]
        case 'stretch':
            return [containerRect.width, containerRect.height]
        case 'contain':
            if (containerRect.width <= containerRect.height) {
                return [containerRect.width, containerRect.width]
            } else {
                return [containerRect.height, containerRect.height]
            }
        case 'cover':
            if (containerRect.width <= containerRect.height) {
                return [containerRect.height, containerRect.height]
            } else {
                return [containerRect.width, containerRect.width]
            }
        default:
            return wantedSize
                ? wantedSize.includes('%')
                    ? wantedSize.split(' ').map(n => Number(n)) as [number, number]
                    : wantedSize.includes('px')
                        ? wantedSize.match(/\d+/g)?.map(n => Number(n)) as [number, number]
                        : [imageOriginalSize.width, imageOriginalSize.height]
                : [imageOriginalSize.width, imageOriginalSize.height]
    }
}