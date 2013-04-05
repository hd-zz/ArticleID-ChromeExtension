/**
 * ChromeHdEceExtension popup.js
 *
 * Used by popup.html
 */

 /**
 * Runs on DOMContentLoaded. Uses article data gathered by backgroundpage and populates list
 * data-fields with data values.
 */
function main() {

  chrome.tabs.getSelected(null, function(tab) {
    var artData = chrome.extension.getBackgroundPage().tabData[tab.id];
    var content = document.getElementById('content');
    var heading = document.getElementById('heading');
    if (artData == null) {
      heading.innerText = 'Ingen artikeldata';
      msgDiv = document.createElement('div');
      msgDiv.className = 'msg';
      msgDiv.innerText = 'Det finns inget escenic-id associerat med denna sida.';
      content.appendChild(msgDiv);
    } else {
      heading.innerText = artData.title;
      var idData = document.getElementById('artId').getElementsByClassName('data')[0];
      idData.innerText = artData.id;
      var sourceData = document.getElementById('source').getElementsByClassName('data')[0];
      sourceData.innerText = artData.source;
      var sourceIdData = document.getElementById('sourceId').getElementsByClassName('data')[0];
      sourceIdData.innerText = artData.sourceId;
      var commentsData = document.getElementById('comments').getElementsByClassName('data')[0];
      commentsData.innerText = artData.comments;

    }
  });
}

document.addEventListener('DOMContentLoaded', main);