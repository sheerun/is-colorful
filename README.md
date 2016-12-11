# is-colorful

Tells whether given image is colorful (or whether it is not monochromatic).

Here's how to currently works:

1. Resizing image to achieve maximum dimension size, for faster processing
2. Iterating through all pixels in resized image
3. Converting them to [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) representation
4. Selecting pixels with lightness in (minLightness..maxLightness) range and saturation > minSaturation
5. Telling whether difference between minimum and maximum hue of selected pixels is greather than threshold

## CLI Usage

```
Usage
  $ is-colorful <filename>

Options
  --resize          Area side in pixels to fit image to if it's larger (default: 400)
  --min-lightness   Minimum lightness of pixel to consider it (default: 30)
  --max-lightness   Maximum lightness of pixel to consider it (default: 70)
  --min-saturation  Maximum saturation of pixel to consider it (default: 70)
  --threshold       Minimum hue difference in considered pixels (deafult: 90)

Return code:

  - 0 if image is colorul
  - 1 on command failure
  - 2 if image is not colorful

Examples
  $ is-colorful pale-face.jpg --min-saturation 40
```

## Programmatic usage

`isColorful(path, options)`

Options are the same like in CLI, but camel cased.

```es6
import isColorful from 'is-colorful'

isColorful('pale-face.jpg', { minSaturation: 40 }).then((colorful) => {
  if (colorful) {
    console.log('Image is colorful!')
  }
})
```

## License

MIT
