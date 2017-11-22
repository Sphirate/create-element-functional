# About

> __IMPORTANT__ This package is experimental

This is replacer for standard `React.createElement` function. It will detect whether the component is functional or not and if component is functional it will render it as function. On other hand if component is not functional it will render it as usual with same speed.

Rendering functional components as functions is good for performance optimisations in most cases. So if you use functional components in your app this package will speed it up. But if you don't have any this package is not for you.

## Usage
Many build tools have ability to replace `React.createElement` by your own function, such as [`babel`](https://www.npmjs.com/package/babel) or even [`typescript`](https://www.npmjs.com/package/typescript). You just need to specify that replacer name with `renderer` function name from that package.

Example (`babel`):
```jsx
/* any/file.js */
import React from 'react';
import functionalCreateElement from 'create-element-functional';

const App = () => <div>Hello World</div>;
const renderedApp = <App />;
```
```json
/* .babelrc */
{
    "plugins": [
        [
            "transform-react-jsx", {
                "pragma": "functionalCreateElement"
            }
        ]
    ]
}
```

You can also use [`babel-plugin-jsx-pragmatic`](https://www.npmjs.com/package/babel-plugin-jsx-pragmatic) to not to import that package to every file with JSX.
```json
/* .babelrc */
{
    "plugins": [
        [
            "transform-react-jsx", {
                "pragma": "functionalCreateElement"
            }
        ],
        [
            "babel-plugin-jsx-pragmatic", {
                "module": "create-element-functional",
                "import": "functionalCreateElement"
            }
        ]
    ]
}
```

## Code preparations
Before you start use your funcional components as functions you have to change them a bit.

### `key` prop
Ypu need to add `key` prop to every functional component you use and use that prop in high-level component inside that functional component.

```jsx
const before = ({ ...props }) => <div>{props.children}</div>;

const after = ({ key = 0, ...props }) => <div key={key}>{props.children}</div>;
```

You need to do that because now functional components are not components at all. They are just functions that return components or `JSX` elements and have no `key` prop.

### Render functional component as "classic" component
Sometimes it's really neede to use functional components as components. To do that you will have to create new class component and make `render` method of that class to return result of functional component.
```jsx
import React from 'react';

const FunctionalComponent = ({ key = 0, ...props }) => <div key={key}>{props.children}</div>;

class ClassicalComponent extends React.Component {
    render() {
        return <FunctionalComponent {...this.props} />;
    }
}
```

## Contribution
Feel free to submit any bug or issue or create PR. Any help wanted