/* eslint-env jest */

import isColorful from '../index'
import {join} from 'path'
import {readdirSync} from 'fs'

readdirSync(join(__dirname, 'colorful')).forEach(filename => {
  test(`says ${filename} is colorful`, async () => {
    const colorful = await isColorful(join(__dirname, 'colorful', filename))

    expect(colorful).toBe(true)
  })
})

readdirSync(join(__dirname, 'monochrome')).forEach(filename => {
  test(`says ${filename} is monochrome`, async () => {
    const colorful = await isColorful(join(__dirname, 'monochrome', filename))

    expect(colorful).toBe(false)
  })
})
