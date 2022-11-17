'use strict'

const czConfig = require('..')
const assert = require('assert').strict

assert.strictEqual(czConfig(), 'Hello from czConfig')
console.info('czConfig tests passed')
