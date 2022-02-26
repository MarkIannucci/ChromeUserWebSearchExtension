const { buildUrl } = require('functions');

chrome.omnibox.onInputEntered.addListener(function (text) {
  chrome.tabs.update({ url: buildUrl(text) });
});
