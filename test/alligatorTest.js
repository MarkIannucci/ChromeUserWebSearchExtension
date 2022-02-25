'use strict';

const test = require('ava');

const {
  trimAlligators,
  prepSearchString,
  buildUrl,
} = require('../Extension/functions');

test('test trim double alligators', async (t) => {
  const output = await trimAlligators('<hey>');
  t.is(output, 'hey');
});

test('test trim leading alligator', async (t) => {
  const output = await trimAlligators('<hey');
  t.is(output, '<hey');
});

test('test trim trailing alligator', async (t) => {
  const output = await trimAlligators('hey>');
  t.is(output, 'hey>');
});

test('test trim no alligators', async (t) => {
  const output = await trimAlligators('hey');
  t.is(output, 'hey');
});
