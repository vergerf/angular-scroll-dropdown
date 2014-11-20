angular-scroll-dropdown
===================

##### Use drop down even in overflow:hidden, auto or scroll element
Basically, you just need to use some directives from angular-scroll-dropdown to do that

## Demo

Your will find a demo on this page:
http://jsfiddle.net/ume7n694/11/

## Usefulness

Be able to use the bootstrap dropdown in an element which have overflow property: hidden or auto (scroll) without being hidden by the element itself. For a better exemple, refer to the demo.

## Dependencies

You will need some libraries:
- angular (of course)
- ui.bootstrap
- jquery

## Usage:

1. Include both `angular-scroll-dropdown.js` and `angular-scroll-dropdown.css` in your index file (`index.html` for exemple).
2. Include the angular-scroll-dropdown as a dependency for your app.
** warning: ui.bootstrap and jquery are needed! **
```angular
 angular.module('myApp', ['angular-scroll-dropdown', 'ui.bootstrap'])
```
3. Add the class `contentscroll` to the element which have the overflow property.
```css
.box {
    /* auto, hidden or scroll */
    overflow: auto;
}```

```html
<div class="box contentscroll">
<!-- elements inside -->
</div>
```
4. Add the class `dropdownscroll` to the the element which will launch the event and `dropdown-menu-scoll` to the targeted element (the one which will be displayed).
```html
    <div class="btn-group dropdownscroll" dropdown>
        <button type="button" class="btn dropdown-toggle">
            Click on me!
        </button>
        <ul class="dropdown-menu dropdown-menu-scoll" role="menu">
            <li>test 1</li>
            <li>test 2</li>
            <li>test 3</li>
            <li class="divider"></li>
            <li>test 4</li>
        </ul>
    </div>
```
