/**
 * ChromeHdEceExtension sniff.js
 *
 * Utility functions parsing the currently viewd page.
 * Used by doc_start.js.
 *
 * This is taylored for the hd.se article pages.
 *
 * David Tiselius <david.tiselius@hd.se>
 */

/**
 * Regexp for the start of the commnent-block we're interessed in.
 */
var eidMatch = /^ECEID: /;

/**
 * Finds the relevant comment block and returns an object with the article
 * meta data:
 * {id, source, sourceId, title, comments}
 */
function getArtData(doc) {

  /*
   * Get the comment nodes from the document head
   */
  var comments = findComments(doc.head, true);
  var ret = null;

  for (var i = 0; i < comments.length; ++i) {
    if (eidMatch.test(comments[i])) {
      ret = createArticleData(comments[i], doc);
      break;
    }
  }

  return ret;
}

/**
 * Builds the article data object from the comment textblock and the DOM Document.
 *
 * This is assuming that the title of the article is located in the (first)
 * h1 tag and that a comments-count can be found in an element with id
 * 'dsq-num-posts' (hd.se uses Disqus).
 *
 */
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

  return {
      id: artId,
      source: artSource,
      sourceId: artSourceId,
      title: artTitle,
      comments: comCount
  }

}

/**
 * Used to get an array of all the comments in a node-tree.
 */
function findComments(parent, recurse) {
  var results= [];
  for (var childi = 0; childi < parent.childNodes.length; childi++) {
      var child = parent.childNodes[childi];
      if (child.nodeType == Node.COMMENT_NODE) {
          results.push(child.data.replace(/^\s+|\s+$/g, ''));
      } else if (recurse && child.nodeType == Node.ELEMENT_NODE) {
          results= results.concat(findComments(child));
      }
  }

  return results;
}
