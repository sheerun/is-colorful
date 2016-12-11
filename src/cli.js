#!/usr/bin/env node

import meow from 'meow'
import colorful from './index'
import {resolve} from 'path'

const cli = meow(`
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
`)

function help () {
  console.log(cli.help)
  process.exit(1)
}

async function main () {
  if (cli.input.length < 1) {
    help()
  }

  const result = await colorful(resolve(process.cwd(), cli.input[0]), cli.flags)

  if (result) {
    process.exit(0)
  } else {
    process.exit(2)
  }
}

main()
