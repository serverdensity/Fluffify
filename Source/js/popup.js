function setIcon(enabled){
    if (enabled){
        chrome.browserAction.setIcon({path: "images/enabled-icon-19.png"});
    } else {
        chrome.browserAction.setIcon({path: "images/disabled-icon-19.jpg"});
    }
}

function installed() {
    chrome.storage.sync.get('enabled', function(item){
        if(item.enabled === undefined) {
            item.enabled = true;
            setIcon(item.enabled);
            chrome.storage.sync.set({'enabled': item.enabled});
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
    chrome.storage.sync.get('enabled', function(item){
        item.enabled = !item.enabled;
        setIcon(item.enabled);
        chrome.storage.sync.set({'enabled': item.enabled});


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
