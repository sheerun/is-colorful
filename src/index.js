import sharp from 'sharp'
import { promisifyAll } from 'bluebird'
import convert from 'color-convert'

const hsl = convert.rgb.hsl;

promisifyAll(sharp.prototype, { multiArgs: true })

export function isColorfulSync (buffer, options = {}) {
  const {
    minLightness = 30,
    maxLightness = 70,
    minSaturation = 30,
    threshold = 90,
    channels = 3
  } = options

  if (channels < 3) {
    return false
  }

  const [h, s, l] = hsl(buffer.slice(0, 3))

  let minHue, maxHue

  let j = 0;

  for (let i = 0; i < buffer.length; i += channels) {
    const [h, s, l] = hsl(buffer.slice(i, i + 3))

    if (l > minLightness && l <= maxLightness) {
      if (s >= minSaturation) {
        if (minHue === undefined || h < minHue) {
          minHue = h
        }

        if (maxHue === undefined || h > maxHue) {
          maxHue = h
        }
      }
    }
  }

  if (minHue === undefined || maxHue === undefined) {
    return false
  }

  return maxHue - minHue > threshold
}

export async function isColorful (file, options = {}) {
  const resize = options.resize || 400
  const [buffer, { size, channels }] = await sharp(file)
    .resize(resize, resize).withoutEnlargement().max().raw().toBufferAsync()

  return isColorfulSync(buffer, { ...options, channels, size })
}

export default isColorful
