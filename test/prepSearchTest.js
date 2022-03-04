'use strict';

const test = require('ava');

const { prepSearchString } = require('../Extension/functions');

test('test space', async (t) => {
  const output = await prepSearchString('two words');
  t.is(output, 'two%20words');
});
