# autoScrollPage
A JS plugin that allows to scroll the pages automatically by clicking the buttons.

<br>

:warning: The code is written in ES6, so probably you need Babel (https://babeljs.io/) or some other compilers

<br>

## Getting Started
1) Add these css rules: 
```css
<style>
  body{
    margin: 0px !important;
  }
  .autoScrollPage {
    min-height: 100vh;
  }
</style>
```
2) Import the AutoPageScroll class:
```javascript
import AutoPageScroll from "./src/AutoPageScroll.js" 
```
3) Create an instance of the class with the parameter "speed" (in the gif example this param is 3)
```javascript
const autoPageScroll = new AutoPageScroll(3);
```
4) Call the method "addLockScroll()" if you want to use the scroll boundaries in the pages. You can remove it with the method "removelockScroll()".
```javascript

autoPageScroll.addLockScroll(); 

//autoPageScroll.removelockScroll();
```

![Alt Text](https://media.giphy.com/media/APqdCCpIZw7JD5xHok/giphy.gif)
