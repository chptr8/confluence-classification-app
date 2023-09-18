# classification-app-for-confluence
A classification app for Confluence

This app enables you to set a classification status for Confluence pages, such as 'Public', 'Restricted', 'Confidential', 'Secret', 'Top Secret'.

## INSTALLATION

###### IMPORTANT

Ready your device to work with Forge: https://developer.atlassian.com/platform/forge/getting-started/

###### HOW TO PUSH TO CONFLUENCE

You may replace 'production' with either 'development' or 'staging' during development/testing.

```
$ npm i
$ forge register
$ forge deploy -e production
$ forge install -e production
```