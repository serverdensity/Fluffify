function setIcon(enabled) {
    if (enabled) {
        chrome.browserAction.setIcon({
            path: "images/fluff-19.png"
        });
    } else {
        chrome.browserAction.setIcon({
            path: "images/fluff-grey-19.png"
        });
    }
}

function installed() {
    chrome.storage.sync.get('enabled', function(config) {
        if (config.enabled === undefined) {
            config.enabled = true;
            setIcon(config.enabled);
            chrome.storage.sync.set({'enabled': config.enabled});
        }

    });
    $.getJSON('/gossip/dictionary.json', function(data) {
            for (var entry in data) {
                var obj = {};
                obj[entry] = data[entry];
                chrome.storage.sync.set(obj);
            }
        })
        .fail(function(xhr) {
            console.log("JSON is most likely faulty");
        })
        .done(function() {
            console.log("This is done!");
        }
    );
}

chrome.runtime.onInstalled.addListener(installed);
