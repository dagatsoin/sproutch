export function imageBackgroundStyle({ capInsets, uri, }) {
    return `
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-width: ${capInsets.borderWidth}px;
    border-style: solid;
    border-image-source: url(${uri});
    border-image-slice: ${capInsets
        ? `${capInsets.top} ${capInsets.right} ${capInsets.bottom} ${capInsets.left} fill`
        : undefined};
  `;
}
//# sourceMappingURL=style.js.map