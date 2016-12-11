import sharp from 'sharp'
import { promisifyAll } from 'bluebird'
import convert from 'color-convert'

const hsl = convert.rgb.hsl;

promisifyAll(sharp.prototype, { multiArgs: true })

export function colorfulSync (buffer, options = {}) {
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

    if (l > minLightness && l < maxLightness) {
      if (s > minSaturation) {
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

async function colorful (file, options = {}) {
  const [buffer, { size, channels }] = await sharp(file).raw().toBufferAsync()

  return colorfulSync(buffer, { ...options, channels, size })
}

export default colorful
