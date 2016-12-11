/* eslint-env jest */

import colorful from '../index'
import {join} from 'path'
import {readdirSync} from 'fs'

readdirSync(join(__dirname, 'colorful')).forEach(filename => {
  test(`says ${filename} is colorful`, async () => {
    const isColorful = await colorful(join(__dirname, 'colorful', filename))

    expect(isColorful).toBe(true)
  })
})

readdirSync(join(__dirname, 'monochrome')).forEach(filename => {
  test(`says ${filename} is monochrome`, async () => {
    const isColorful = await colorful(join(__dirname, 'monochrome', filename))

    expect(isColorful).toBe(false)
  })
})
