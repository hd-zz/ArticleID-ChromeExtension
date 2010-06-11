var artData = getArtData(document);
if (artData != null) {
  /*
   * Send data to background page that is listening
   */
  chrome.extension.sendRequest({msg: "articleDocument",
                                href: location.href,
                                articleData: artData
                               });
} else {
  /*
   * Send data to background page that is listening
   */
  chrome.extension.sendRequest({msg: "noArtid",
                                href: location.href});

}