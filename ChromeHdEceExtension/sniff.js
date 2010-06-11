var eidMatch = /^ECEID: /;

function getArtData(doc) {


  /*
   * Get the nodes in element pri
   * see https://developer.mozilla.org/en/DOM/document.evaluate
   */

  var comments = findComments(doc.getElementById('bd'), true);
  var ret = null;

  for (var i = 0; i < comments.length; ++i) {
    if (eidMatch.test(comments[i])) {
      ret = createArticleData(comments[i], doc);
      break;
    }
  }

  return ret;
}

function createArticleData(text, doc) {
  var lines = text.split("\n");

  var artId = lines[0].replace(/^ECEID:\s+(\d+)$/, "$1");

  var artSource = lines[1].replace(/^\s*SOURCE:\s+(\w+)$/, "$1");
  if (artSource.indexOf('SOURCE:') > 0) { //if no match everything is put in $1
    artSource = '-';
  }
  var artSourceId = lines[2].replace(/^\s*SOURCEID:\s+(\S+)$/, "$1");
  if (artSourceId.indexOf('SOURCEID:') > 0) {
    artSourceId = '-';
  }

  var artTitle = '<Ingen titel>';
  var titleRes = doc.evaluate('//h1', doc, null, 0, null);
  if (titleRes != null) {
    var titleResNext = titleRes.iterateNext();
    if (titleResNext != null) {
      artTitle = titleResNext.textContent;
    }
  }

  var comCount = 'N/A';
  var comCountRes = doc.evaluate('//span[@id="dsq-num-posts"]', doc, null, 0, null);
  if (comCountRes != null) {
    var comCountResNext = comCountRes.iterateNext();
    if (comCountResNext != null) {
      comCount = comCountResNext.textContent;
    }
  }

  return {id: artId,
      source: ((artSource) ? artSource : 'N/A'),
      sourceId: ((artSourceId) ? artSourceId : 'N/A'),
      title: artTitle,
      comments: comCount
  }

}

function findComments(parent, recurse) {
  var results= [];
  for (var childi= 0; childi<parent.childNodes.length; childi++) {
      var child= parent.childNodes[childi];         
      if (child.nodeType == Node.COMMENT_NODE) {
          results.push(child.data.replace(/^\s+|\s+$/g, ''));
      } else if (recurse && child.nodeType == Node.ELEMENT_NODE) {
          results= results.concat(findComments(child));
      }
  }
  return results;
}
