'use strict';

const test = require('ava');

const { buildUrl } = require('../Extension/functions');

test('test sherlock url', async (t) => {
  const output = await buildUrl('sherlock nothing');
  t.is(
    output,
    'https://sherlock.epic.com/default.aspx?view=slg/search#txt=nothing',
  );
});

test('test slg url', async (t) => {
  const output = await buildUrl('slg nothing');
  t.is(
    output,
    'https://sherlock.epic.com/default.aspx?view=slg/search#txt=nothing',
  );
});

test('test sherlock two word url', async (t) => {
  const output = await buildUrl('sherlock nothing nothing');
  t.is(
    output,
    'https://sherlock.epic.com/default.aspx?view=slg/search#txt=nothing%20nothing',
  );
});

test('test ra url', async (t) => {
  const output = await buildUrl('ra nothing');
  t.is(
    output,
    'https://sherlock.epic.com/default.aspx?view=ra/search#txt=nothing',
  );
});

test('test nova url', async (t) => {
  const output = await buildUrl('nova nothing');
  t.is(output, 'https://nova.epic.com/Search.aspx#addPt1&SearchTerm=nothing');
});

test('test topic url', async (t) => {
  const output = await buildUrl('topic nothing');
  t.is(output, 'https://userweb.epic.com/Search?Query=nothing');
});

test('test galaxy url', async (t) => {
  const output = await buildUrl('galaxy nothing');
  t.is(output, 'https://galaxy.epic.com/?#Search/searchWord=nothing');
});

test('test dh url', async (t) => {
  const output = await buildUrl('dh nothing');
  t.is(
    output,
    'https://datahandbook.epic.com/Search/Index?SearchWord=nothing&type=1&scf=1,2,3&auf=1',
  );
});

test('test cdd url', async (t) => {
  const output = await buildUrl('cdd nothing');
  t.is(
    output,
    'https://datahandbook.epic.com/Search/Index?SearchWord=nothing&type=6',
  );
});

test('test webserv url', async (t) => {
  const output = await buildUrl('webserv nothing');
  t.is(
    output,
    'https://datahandbook.epic.com/Search/Index?SearchWord=nothing&type=5&def=0',
  );
});

test('test pg url', async (t) => {
  const output = await buildUrl('pg nothing');
  t.is(
    output,
    'https://datahandbook.epic.com/Search/Index?SearchWord=nothing&type=2',
  );
});

test('test metric url', async (t) => {
  const output = await buildUrl('metric nothing');
  t.is(
    output,
    'https://datahandbook.epic.com/Search/Index?SearchWord=nothing&type=4',
  );
});
