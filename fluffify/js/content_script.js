chrome.storage.sync.get('enabled', function(config){
    if(config.enabled){
        chrome.storage.sync.get(null, function(data){
            walk(document.body, data);
        });
    } else {
        console.log("Plugin turned off");
    }

});


function walk(node, dict)
{
    var excludeElements = ['script', 'style', 'iframe', 'canvas'];
	// I stole this function from here:
	// http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType )
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child )
            {
                if (child.parentElement.className.indexOf('fluffify-ani') > 0){
                    continue;
                } else {
                    next = child.nextSibling;
                    walk(child, dict);
                    child = next;
                }
            }
            break;

        case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node, dict);
            }
            break;
    }
}

function handleText(textNode, dict) {
    var text = textNode.nodeValue;
    var offset, newNode;
    for(var entry in dict){
        if(entry !== 'enabled'){
            regex = new RegExp("\\b" + entry + "\\b", "gi");
            // if(regex.test(text)){
            match = regex.exec(textNode.data);
            if (match) {
                offset = match.index;
            }
            if(offset !== -1 && offset != undefined && match) {
                newNode = textNode.splitText(offset);
                newNode.data = newNode.data.substr(entry.length);

                var span = document.createElement("span");
                span.className = "fluffify-ani";
                span.textContent = dict[entry];
                // span.title = entry;
                span.dataset.original = entry;
                textNode.parentNode.insertBefore(span, newNode);
            }

            // }
        }
    }
}

