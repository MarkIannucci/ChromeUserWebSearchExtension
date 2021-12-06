function trimAlligators(searchText) {
    if (searchText.slice(0, 1) == '<' && searchText.slice(-1) == '>') {
        return searchText.slice(1, -1);
    } else
    { return searchText; }
};

function prepSearchString(searchText) {
    return encodeURIComponent(trimAlligators(searchText))
};

chrome.omnibox.onInputEntered.addListener(
    function (text) {
        // use a constant if the URL is getting reused
        const galaxyInitialURL = 'https://galaxy.epic.com/?#Search/searchWord=';
        const dhInitialURL = 'https://datahandbook.epic.com/Search/Index?SearchWord=';
        const novaInitialURL = 'https://nova.epic.com/';
        const sherlockInitialURL = 'https://sherlock.epic.com/default.aspx?';

        // if user enters a keyword after the omnibox keyword, redirect search to different destination
        var splitText = text.split(' ');
        var firstWord = splitText[0];
        var secondWord = splitText[1];

        switch (firstWord.toLowerCase()) {
            case 'sherlock':
            case 'slg':
                if (secondWord.toLowerCase() === 'new') {
                    var newURL = sherlockInitialURL + 'view=slg/create';
                } else if (isNaN(secondWord)) {
                    var newURL = sherlockInitialURL + 'view=slg/search#txt=' + prepSearchString(text.substring(firstWord.length + 1));
                } else {
                    var newURL = sherlockInitialURL + 'view=slg/home#id=' + secondWord + '&view=1';
                }
                break;
            case 'ra':
                var newURL = sherlockInitialURL + 'view=ra/search#txt=' + prepSearchString(text.substring(firstWord.length + 1));
                break;
            case 'chk':
                if (isNaN(secondWord)) {
                    var newURL = sherlockInitialURL + 'view=checklist/search#txt=' + prepSearchString(text.substring(firstWord.length + 1));
                } else {
                    var newURL = sherlockInitialURL + 'view=checklist/search#id=' + secondWord;
                }
                break;
            case 'qan':
                if (isNaN(secondWord)) {
                    var newURL = sherlockInitialURL + 'view=zqn/search#es=1&txt=' + prepSearchString(text.substring(firstWord.length + 1));
                } else {
                    var newURL = sherlockInitialURL + 'view=zqn/search#es=1&id=' + secondWord ;
                }
                break;
            case 'nova':
                if (isNaN(secondWord)) {
                    var newURL = novaInitialURL + 'Search.aspx#addPt1&SearchTerm=' + prepSearchString(text.substring(firstWord.length + 1));
                } else {
                    var newURL = novaInitialURL + 'Select.aspx?RnID=' + secondWord;
                }
                break;
            case 'topic':
                var newURL = 'https://userweb.epic.com/Search?Query=' + prepSearchString(text.substring(firstWord.length + 1));
                break;
            case 'galaxy':
                var newURL = galaxyInitialURL + prepSearchString(text.substring(firstWord.length + 1));
                break;
            case 'dh':
                var newURL = dhInitialURL + prepSearchString(text.substring(firstWord.length + 1)) + '&type=1&scf=1,2,3&auf=1';
                break;
            case 'cdd':
                var newURL = dhInitialURL + prepSearchString(text.substring(firstWord.length + 1)) + '&type=6';
                break;
            case 'webserv':
                var newURL = dhInitialURL + prepSearchString(text.substring(firstWord.length + 1)) + '&type=5&def=0';
                break;
            case 'pg':
                var newURL = dhInitialURL + prepSearchString(text.substring(firstWord.length + 1)) + '&type=2';
                break;
            case 'metric':
                var newURL = dhInitialURL + prepSearchString(text.substring(7)) + '&type=4';
                break;
            default:
                var newURL = galaxyInitialURL + prepSearchString(text);
        }

        chrome.tabs.update({ url: newURL });
    });
