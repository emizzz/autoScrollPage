# autoScrollPage
A JS mini-library that allows to scroll the pages automatically by clicking the buttons.

Tested:
  * with React
  * with mobile devices

## Getting Started
1) Import css: 
```html
<link rel="stylesheet" href="./lib/AutoScrollPage.css">
```
2) Import the AutoPageScroll class:
```html
<script src="./lib/AutoScrollPage.bundle.js"></script>
```
3) Create an instance of the class with the parameter "speed" (in the gif example this param is 3)
```javascript
var autoPageScroll = new AutoPageScroll(3);
```
4) Call the method "addLockScroll()" if you want to use the scroll boundaries in the pages. You can remove it with the method "removelockScroll()".
```javascript

autoPageScroll.addLockScroll(); 

//autoPageScroll.removelockScroll();
```

![Alt Text](https://media.giphy.com/media/APqdCCpIZw7JD5xHok/giphy.gif)
