# Atlas Extension

## How to Install an Extension

You can see a video [here](https://www.dropbox.com/s/lxt9m7gplyyqn8w/Setup%20Extension.mp4?dl=0)

Once you have the extension installed the "Popup" will show you how to get started as well.

Once installed this video will help you undestand how to use the extension [here](https://www.dropbox.com/s/fhp69hdqwjeekqg/Using%20the%20Tool.mp4?dl=0)

**MAKE SURE TO GET THE LATEST RELEAE**
Go to [https://github.com/Unearth-Campaigns/chrome-extension-social/releases](https://github.com/Unearth-Campaigns/chrome-extension-social/releases)

And get the top one

<img width="915" alt="image" src="https://user-images.githubusercontent.com/365385/165622724-cb9e859c-cad8-4a97-9ebe-3185d333ed75.png">

Once you download it and move it to a folder just go to `chrome://extensions` and "Load unpacked" and point it to the folder you just created during the `unzipping` of that file it might be calld **dist**

## Getting started for the developer

Below is yarn but npm works as well.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

or

```
npm run watch
```

You might still need to reload the extension and might even see errors in there.

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Release a new version

### Create the Zip for Github

Visit

<img width="915" alt="image" src="https://user-images.githubusercontent.com/365385/165622570-a7f13d79-f642-4c28-b4d3-c8e362183ee2.png">

### Make sure to bump the version in

```
File: manifest.development.json
5:     "version": "3.0.0",
```

and

```
File: manifest.production.json
5:     "version": "3.0.0",
```

### Compiles and hot-reloads for development

Bump the version

```
File: manifest.production.json
5:     "version": "5.1.1",
```

```
File: manifest.development.json
5:     "version": "5.1.1",
```

Run

```bash
bash ./release.sh
```

and it will make the new Zip file.
Just upload that to the new release.

![](/docs/upload_release.gif)

## LINKS

### Icons

https://icons.getbootstrap.com
