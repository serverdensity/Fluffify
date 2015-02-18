chrome.storage.sync.get('enabled', function (config){
  if(config.enabled){
    chrome.storage.sync.get(null, function (data){
      walk(document.body, data);
    });
  } else {
    console.log('Plugin turned off');
  }
});


function walk (node, dict) {
  var excludeElements = ['script', 'style', 'iframe', 'cavas'];
  // I stole this function from here:
  // http://is.gd/mwZp7E
  var child, next;
  switch (node.nodeType) {
    // Element.
    case 1:
    // Document.
    case 9:
    // Document fragment.
    case 11:
      child = node.firstChild;
      while (child) {
        if (child.parentElement.className.indexOf('fluffify-ani') > 0){
          continue;
        } else {
          next = child.nextSibling;
          walk(child, dict);
          child = next;
        }
      }
      break;

  // Text node.
  case 3:
    if (node.parentElement.tagName.toLowerCase() != 'script') {
      handleText(node, dict);
    }
    break;
  }
}

function handleText (textNode, dict) {
  var text = textNode.nodeValue,
      offset,
      newNode;
  for (var entry in dict) {
    if (entry !== 'enabled') {
      regex = new RegExp("\\b" + entry + "\\b", "gi");
      match = regex.exec(textNode.data);
      if (match) {
        offset = match.index;
      }
      if (offset !== -1 && offset != undefined && match) {
        newNode = textNode.splitText(offset);
        newNode.data = newNode.data.substr(entry.length);
        var span = document.createElement("span");
        span.className = 'fluffify-ani';
        span.textContent = dict[entry];
        span.title = entry;
        textNode.parentNode.insertBefore(span, newNode);
      }
    }
  }
}

