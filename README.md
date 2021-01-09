# VMyu - Improving your Korean vocabulary by reading the latest news articles

<p align='center'>
    <img src ='docs/img/vmyu_screenshot.png'>
</p>
<p align='center'>
    <img src ='docs/img/logo_small.png'>
</p>

## Built with
- TypeScript
- Chrome Extension API
- Node.js
- Electron
- React
- Redux
- PostgreSQL
- Docker

## Blog post
I wrote a short blog post where I demo this project and explain its motivations.

[davidkwon.me/blog/hello-world-introducing-vmyu](https://davidkwon.me/blog/hello-world-introducing-vmyu)

## About
VMyu is a cross-platform desktop application and Google Chrome extension that makes it
easy to learn and keep track of new Korean vocabulary words from the latest news articles.

This repository contains code for the desktop application only.

## Structure
VMyu is a combination of three components: the desktop application, the Google Chrome
extension and the server to handle database requests. Each component communicates
with one another to provide a cohesive user experience.

### Desktop application (Typescript, React, Redux, Electron)
 - Keeps track of saved articles, words and definitions
 - Search functionality for saved articles, words and definitions
 - Edit saved words and definitions
 - Cue card feature to help review words and their definitions

### Google Chrome extension (Typescript)
 - Seamlessly integrates with news websites (currently only supports [news.naver.com](https://news.naver.com))
 - Quickly search and save word definitions from [en.dict.naver.com](https://en.dict.naver.com/#/main)
 - Displays words that you may have seen before, helping you apply previous knowledge to new contexts
 - Highlight words within news articles
 - Hover feature to display definitions

### Server (Typescript, Express.js, PostgreSQL, Docker)
 - REST API to handle database requests for creating/deleting articles, words, definitions and highlights

## Usage
As mentioned above, VMyu is a combination of three components: the desktop application,
the Google Chrome extension and the server to handle database requests.
This repository only contains source code for the desktop application.
If this project gets traction, I'll likely open source the Google Chrome extension and server.

[ReadLang](https://readlang.com) is a web application and Google Chrome extension that
offers a different, but in many ways, a similar workflow to VMyu, with support for about 60 languages.
In my experience, support for Korean is not as polished (it is in beta mode) compared
to support for languages like English, French and Spanish.
This is mainly due to the fact that word spacing in Korean works differently.

## License

Licensed under the [GNU General Public License v3.0](LICENSE.md) license.