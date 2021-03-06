declare var process

// @credit https://github.com/mui-org/material-ui

/**
 * Returns a number whose value is limited to the given range.
 */
function clamp(value: any, min: number = 0, max: number = 1) {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 */
function convertHexToRGB(color: any) {
  color = color.substr(1)

  const re = new RegExp(`.{1,${color.length / 3}}`, 'g')
  let colors = color.match(re)

  if (colors && colors[0].length === 1) {
    colors = colors.map((n: any) => n + n)
  }

  return colors
    ? `rgb(${colors.map((n: any) => parseInt(n, 16)).join(', ')})`
    : ''
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 */
function rgbToHex(color: string) {
  // Pass hex straight through
  if (color.indexOf('#') === 0) {
    return color
  }
  function intToHex(c: any) {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  let { values } = decomposeColor(color)
  values = values.map((n: any) => intToHex(n))

  return `#${values.join('')}`
}

/**
 * Returns an object with:
 * - the type of the color format ('rgb', 'rgba', 'hsl', 'hsla')
 * - the R, G, B values as an array
 *
 * Note: Does not support rgb % values.
 */
function decomposeColor(color: string): { type: string; values: number[] } {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color))
  }

  const marker = color.indexOf('(')
  const type = color.substring(0, marker)
  const values = color
    .substring(marker + 1, color.length - 1)
    .split(',')
    .map(value => parseFloat(value))

  if (process.env.NODE_ENV !== 'production') {
    if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
      throw new Error(
        [
          `Sproutch: unsupported \`${color}\` color.`,
          'We support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().',
        ].join('\n')
      )
    }
  }

  return { type, values }
}

/**
 * Converts a color object with type and values to a string.
 */
function recomposeColor(color: any) {
  const { type } = color
  let { values } = color

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n: any, i: number) => (i < 3 ? parseInt(n, 10) : n))
  }

  if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`
    values[2] = `${values[2]}%`
  }

  return `${color.type}(${values.join(', ')})`
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
function getContrastRatio(foreground: any, background: any) {
  const lumA = getLuminance(foreground)
  const lumB = getLuminance(background)
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
function getLuminance(color: any) {
  const decomposedColor = decomposeColor(color)

  if (decomposedColor.type.indexOf('rgb') !== -1) {
    const rgb = decomposedColor.values.map((val: any) => {
      val /= 255 // normalized
      return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
    })
    // Truncate at 3 digits
    return Number(
      (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)
    )
  }

  // else if (decomposedColor.type.indexOf('hsl') !== -1)
  return decomposedColor.values[2] / 100
}

/**
 * Darken or lighten a colour, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 */
function emphasize(color: any, coefficient: number = 0.15) {
  return getLuminance(color) > 0.5
    ? darken(color, coefficient)
    : lighten(color, coefficient)
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 */
function fade(color: any, value: number) {
  if (!color) return color

  color = decomposeColor(color)
  value = clamp(value)

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a'
  }
  color.values[3] = value

  return recomposeColor(color)
}

/**
 * Darkens a color.
 */
function darken(color: any, coefficient: number) {
  if (!color) return color

  color = decomposeColor(color)
  coefficient = clamp(coefficient)

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient
    }
  }
  return recomposeColor(color)
}

/**
 * Lightens a color.
 */
function lighten(color: any, coefficient: number) {
  if (!color) return color

  color = decomposeColor(color)
  coefficient = clamp(coefficient)

  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient
  } else if (color.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient
    }
  }

  return recomposeColor(color)
}

export const colorManipulator = {
  convertHexToRGB,
  rgbToHex,
  decomposeColor,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize,
  fade,
  darken,
  lighten,
}
