var liEl = "<li id='{{id}}' class='dict-entry'>" +
            "<div class='left li-el'>{{key}}</div>" +
            "<div class='right li-el'> {{value}}</div>" +
            "<div class='li-el'>" +
            "<img class='remove' src='images/disabled.png'></li>" +
            "</div>";

function replaceAll(str,mapObj){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
}

function replaceWords(str, word, replacement){
    replacing = true;
    while(replacing) {
        str = str.replace(word, replacement);
        if (str.search(word) === -1){
            replacing = false;
        }
    }
    return str;
}

function makeLiList(storageData){
    chrome.storage.sync.get(storageData, function(result){
        var str = '';
        for(var entry in result){
            if(entry !== 'enabled'){
                console.log(entry);
                var entryUnderscore = replaceWords(entry, ' ', '_');
                str = replaceWords(liEl, '{{id}}', entryUnderscore);
                str = replaceWords(str, '{{key}}', entry);
                str = replaceWords(str, '{{value}}', result[entry]);
                $(".dict-list").append(str);
            }
        }
    });
}


$(document).ready(function(){
    console.log('running');
    chrome.storage.sync.get(null, function(items){
        makeLiList(items);
        console.log(items);
    });
    $('.dict-list').on('click', '.remove', function(event){
        var elId = event.currentTarget.parentElement.id;
        $('#'+elId).remove();
        chrome.storage.sync.remove(elId, function(){
            console.log(chrome.runtime.lastError.message);
        });
        console.log("remove");
        console.log(event);
    });
    $('#addword').on('click', function(){
        var key = $('#key').prop('value');
        var val = $('#val').prop('value');
        $('#key').prop('value', '');
        $('#val').prop('value', '');
        var obj = {};
        obj[key] = val;
        chrome.storage.sync.get(key, function(data){
            console.log(data);
            if(Object.keys(data)[0] === key){
                $('#'+key).remove();
            }
            if(data !== obj){
                // duplicate code here.
                for(var entry in obj){
                    console.log(entry);
                    var entryUnderscore = replaceWords(entry, ' ', '_');
                    str = replaceWords(liEl, '{{id}}', entryUnderscore);
                    str = replaceWords(str, '{{key}}', entry);
                    str = replaceWords(str, '{{value}}', obj[entry]);
                    $(".dict-list").append(str);
                }
            }
        });
        chrome.storage.sync.set(obj, function(data){
            console.log(chrome.extension.lastError.message);
        });
    });
});


// make a sorted list of dictionary words for later.
// update words from repo, is that needed ?
// what happens if I have added words and then there is an update of new words?
// whitelist add to later.
