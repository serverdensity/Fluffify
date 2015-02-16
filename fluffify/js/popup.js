function setIcon(enabled){
    if (enabled){
        chrome.browserAction.setIcon({path: "images/fluff.svg"});
    } else {
        chrome.browserAction.setIcon({path: "images/fluff-grey.svg"});
    }
}

function toggleState(){
    chrome.storage.sync.get('enabled', function(config){
        config.enabled = !config.enabled;
        setIcon(config.enabled);
        chrome.storage.sync.set({'enabled': config.enabled});
    });
}

$(document).ready(function(){
    $('#enabled').on('click', function(event){
        console.log("muu!");
        $(".onoff").toggle();
        toggleState();
    });
});

chrome.browserAction.onClicked.addListener(toggleState);
