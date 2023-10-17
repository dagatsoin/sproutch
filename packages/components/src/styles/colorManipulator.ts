// @credit https://github.com/mui-org/material-ui

/**
 * Returns a number whose value is limited to the given range.
 */
function clamp(value: number, min: number = 0, max: number = 1) {
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
function convertHexToRGB(color: string) {
  color = color.substring(1)

  const re = new RegExp(`.{1,${color.length / 3}}`, 'g')
  const match = color.match(re)

  const colors = match && match[0].length === 1
    ? match.map((n) => n + n)
    : match

  return colors
    ? `rgb(${colors.map(n => n + n).map((n) => parseInt(n, 16)).join(', ')})`
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
  function intToHex(c: number) {
    const hex = c.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  const { values } = decomposeColor(color)

  return `#${values.map(n => intToHex(n)).join('')}`
}

export interface ColorComposition{
  type: string
  values: number[]
}

/**
 * Returns an object with:
 * - the type of the color format ('rgb', 'rgba', 'hsl', 'hsla')
 * - the R, G, B values as an array
 *
 * Note: Does not support rgb % values.
 */
function decomposeColor(color: string): ColorComposition {
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
function recomposeColor(composition: ColorComposition) {
  const { type } = composition
  const { values } = composition

  const formattedValue = type.indexOf('rgb') !== -1
    // Only convert the first 3 values to int (i.e. not alpha)
    ? values.map((n, i) => (i < 3 ? parseInt(n.toString(), 10) : n))
    : type.indexOf('hsl') !== -1
      ? [values[0], `${values[1]}%`, `${values[2]}%`]
      : values
    

  return `${composition.type}(${formattedValue.join(', ')})`
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
function getContrastRatio(foreground: string, background: string) {
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
function getLuminance(color: string) {
  const decomposedColor = decomposeColor(color)

  if (decomposedColor.type.indexOf('rgb') !== -1) {
    const rgb = decomposedColor.values.map(val => {
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
function emphasize(color: string, coefficient: number = 0.15) {
  return getLuminance(color) > 0.5
    ? darken(color, coefficient)
    : lighten(color, coefficient)
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 */
function fade(color: string, value: number) {
  const composition = decomposeColor(color)
  value = clamp(value)

  if (composition.type === 'rgb' || composition.type === 'hsl') {
    composition.type += 'a'
  }
  composition.values[3] = value

  return recomposeColor(composition)
}

/**
 * Darkens a color.
 */
function darken(color: string, coefficient: number) {
  const composition = decomposeColor(color)
  coefficient = clamp(coefficient)

  if (composition.type.indexOf('hsl') !== -1) {
    composition.values[2] *= 1 - coefficient
  } else if (composition.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      composition.values[i] *= 1 - coefficient
    }
  }
  return recomposeColor(composition)
}

/**
 * Lightens a color.
 */
function lighten(color: string, coefficient: number) {
  const composition = decomposeColor(color)
  coefficient = clamp(coefficient)

  if (composition.type.indexOf('hsl') !== -1) {
    composition.values[2] += (100 - composition.values[2]) * coefficient
  } else if (composition.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      composition.values[i] += (255 - composition.values[i]) * coefficient
    }
  }

  return recomposeColor(composition)
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
