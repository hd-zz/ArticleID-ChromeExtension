/**
 * ChromeHdEceExtension doc_start.js
 *
 * Initializes the action.
 * Depends on sniff.js being injected before.
 *
 * David Tiselius <david.tiselius@hd.se>
 */

var artData = getArtData(document);

if (artData != null) {
  /*
   * Send data to listening backgroundpage
   */
  chrome.extension.sendRequest({msg: "articleDocument",
                                href: location.href,
                                articleData: artData
                               });
} else {
  /*
   * Send message to listening backgroundpage
   */
  chrome.extension.sendRequest({msg: "noArtid",
                                href: location.href});

}