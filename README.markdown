This is the code for a Chrome extension to use internally at hd.se to simplify getting the ID of the currently viewd article. We have good URLs that don't include this since it's irrelevant for the general visitor of the site.

## Adopting for other sites
The extension uses a script to pick out text from a *html comment block* that is put on all article pages by our templates.

This is an example of the comments-block:

     <!--
         ECEID:    722356
         SOURCE:   newspilot
         SOURCEID: 595182
      --> 

To use this extension on another site you need to adopt the functions in sniff.js. So there is nothing specific to escenic in the code. Just as long as the ID can be identified somehow in the source of the currently viewd page.

You also need to adopt the manifest.json to make it work for other sites.

##The code
The base for the code is in the ChromeHdEceExtension/ directory.
For more info on writing extensions go [here](http://code.google.com/chrome/extensions/ "Google Chrome Extensions - Google Code").

## Screenshot
Using the extension on the hd.se site (article page)
![screenshot](http://github.com/hd/ArticleID-ChromeExtension/tree/master/screenshot.png?raw=true)