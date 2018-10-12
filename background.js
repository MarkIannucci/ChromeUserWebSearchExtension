chrome.omnibox.onInputEntered.addListener(
    function (text) {

        // if user enters a keyword after the omnibox keyword, redirect search to different destination
        var splitText = text.split(' ');
        var firstWord = splitText[0];

        switch (firstWord) {
            case 'sherlock':
                var newURL = 'https://sherlock.epic.com/default.aspx?view=slg/search#txt=' + encodeURIComponent(text.substring(9));
                break;
            case 'topic':
                var newURL = 'https://userweb.epic.com/Search?Query=' + encodeURIComponent(text.substring(6));
                break;
            case 'galaxy':
                var newURL = 'https://galaxy.epic.com/?#Search/searchWord=' + encodeURIComponent(text.substring(6));
                break;
            default:
                var newURL = 'https://galaxy.epic.com/?#Search/searchWord=' + encodeURIComponent(text);
        }

        chrome.tabs.update({ url: newURL });
    });