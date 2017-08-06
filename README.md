# yui-md
Material Design implementation, written in React and Sass. 

<h1>Setup/Installation</h1>
Todo


<h1>Utils</h1>

A series of higher-order utility components that allow you to apply styles to your own custom components. For any utility you
use, there is a list of props you <b>must</b> pass in to the highest-level component that your `render` method returns.

<h3>applyRipple(WrappedComponent, rippleFilter)</h3>

Arguments|Description
---------|-----------
`WrappedComponent <React.Component>`|The component to apply the filter to.
`rippleFilter <function>`|A predicate called on the `onMouseDown` event that should return whether or not to execute the ripple.

Props Provided|Description
--------------|-----------
`ref <function>`|Gets a reference to the node that the ripple is placed on.
`className <string>`|The classes placed on the node that the ripple is placed on.
`onMouseDown <function>`|Ripple function executed on the onMouseDown.
