function setIcon(enabled){
    if (enabled){
        chrome.browserAction.setIcon({path: "images/enabled-icon-19.png"});
    } else {
        chrome.browserAction.setIcon({path: "images/disabled-icon-19.jpg"});
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
chrome.runtime.onInstalled.addListener(function(){
    installed();
});


// chrome.browserAction.setIcon({path: "images/icon.png"});
// chrome.browserAction.setBadgeText({text: "?"});
