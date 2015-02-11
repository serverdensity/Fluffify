function setIcon(enabled){
    if (enabled){
        chrome.browserAction.setIcon({path: "images/enabled-icon-19.png"});
    } else {
        chrome.browserAction.setIcon({path: "images/disabled-icon-19.jpg"});
    }
}

function installed() {
    chrome.storage.sync.get('config', function(config){
        if(config.enabled === undefined) {
            config.enabled = true;
            setIcon(config.enabled);
            chrome.storage.sync.set({'config': config.enabled});
        }
    });

    $.getJSON('/data/dictionary.json', function(data){
        for(var entry in data){
            chrome.storage.sync.set({entry: data[entry]});
        }
    });
}

console.log("testing");

function toggleState(){
    chrome.storage.sync.get('config', function(config){
        config.enabled = !config.enabled;
        setIcon(config.enabled);
        chrome.storage.sync.set({'config': config.enabled});
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
chrome.runtime.onInstalled.addListener(installed);


// chrome.browserAction.setIcon({path: "images/icon.png"});
// chrome.browserAction.setBadgeText({text: "?"});
