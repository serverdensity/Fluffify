function setIcon(enabled){
    if (enabled){
        chrome.browserAction.setIcon({path: "images/enabled-icon-19.png"});
    } else {
        chrome.browserAction.setIcon({path: "images/disabled-icon-19.jpg"});
    }
}

function installed() {
    chrome.storage.sync.get('enabled', function(config){
        if(config.enabled === undefined) {
            config.enabled = true;
            setIcon(config.enabled);
            chrome.storage.sync.set({'enabled': config.enabled});
        }
    });

    $.getJSON('/data/dictionary.json', function(data){
        console.log('test');
        for(var entry in data){
            var obj = {};
            obj[entry] = data[entry];
            chrome.storage.sync.set(obj);
        }
    });
}

chrome.runtime.onInstalled.addListener(function(){
    installed();
});
