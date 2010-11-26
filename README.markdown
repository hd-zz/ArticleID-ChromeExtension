#README
This is the code for a Chrome extension to use internally at [hd.se](http://hd.se/ "Helsingborgs Dagblad") to simplify for an editor to get the ID of the currently viewd article. We have _good_ URLs that don't include internal IDs and such. This information is irrelevant for the ordinary visitor of the site. When editing the site, however, other metadata can be relevant to get to easily and that's why we wrote this small Chrome extension.
We're sharing it here so that others can clone the code and modify it for their setup.

## Adopting for other sites
The extension uses a script to pick out text from a *html comment block* that is put on all article pages by our templates.

This is an example of the comments-block:

     <!--
         ECEID:    722356
         SOURCE:   newspilot
         SOURCEID: 595182
      --> 

To use this extension on another site you need to adopt the functions in sniff.js. So there is nothing specific to a single cms in the this code. All you need is that the ID (or other relavant metadata) can be identified somehow in the source of the currently viewd page.

You also need to adopt the manifest.json to make it work for other sites (you'll know what when you look at it).

##The code
The base for the code is in the ChromeHdEceExtension/ directory.
For more info on writing extensions go [here](http://code.google.com/chrome/extensions/ "Google Chrome Extensions - Google Code").

## Screenshot
Using the extension on the hd.se site (article page):

![screenshot](https://github.com/hd/ArticleID-ChromeExtension/raw/master/screenshot.png)
             