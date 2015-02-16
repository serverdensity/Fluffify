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
        chrome.storage.sync.set({'enabled': config.enabled});
        setIcon(config.enabled);
        checkState();
    });
}

function checkState(){
    chrome.storage.sync.get('enabled', function(config){
        console.log('trigger');
        if(config.enabled){
            console.log('on');
            $(".on").addClass('disabled').removeClass('enabled');
            $(".off").addClass('enabled').removeClass('disabled');
        } else {
            $(".off").addClass('disabled').removeClass('enabled');
            $('.on').addClass('enabled').removeClass('disabled');
        }
    });
}

$(document).ready(function(){
    checkState();
    $('#enabled').on('click', function(event){
        console.log("muu!");
        toggleState();
    });
});

chrome.browserAction.onClicked.addListener(toggleState);
