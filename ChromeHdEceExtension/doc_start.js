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
  chrome.extension.sendMessage({msg: "articleDocument",
                                href: location.href,
                                articleData: artData
                               });

  /* NO use sending event 'showPopup' to extension on 'e'-keydown as planned, only way to show
     the popup is by user mouse-click.
    document.addEventListener('keydown', function(event) {
      if (event.keyIdentifier === 'U+0045') { // 'e'
        chrome.extension.sendMessage({msg: 'showPopup'});
      }
    }, false);
  */
  } else {
  /*
   * Send message to listening backgroundpage
   */
  chrome.extension.sendMessage({msg: "noArtid",
                                href: location.href});

}