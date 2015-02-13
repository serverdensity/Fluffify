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
				next = child.nextSibling;
				walk(child, dict);
				child = next;
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
    for(var entry in dict){
        if(entry !== 'enabled'){
            regex = new RegExp("\\b" + entry, "gi");
            text = text.replace(regex, dict[entry]);
        }
    }

    // // Get the corner cases
    // if (v.match(/cloud/i)) {
    //     // If we're not talking about weather
    //     if (v.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|/i)) {
    //         v = v.replace(/(C|c)loud/gi, function(match, p1, offset, string) {
    //             // c - 1 = b
    //             b = String.fromCharCode(p1.charCodeAt(0) - 1);
    //             return b + "utt";
    //         });
    //     }
    // }
    textNode.nodeValue = text;
}

