import React from 'react';

const isPureSFComponent = (component) => (
    typeof component === 'function' &&
    component.prototype instanceof React.Component === false &&
    !component.contextTypes
);

const formatChildren = (children) => children.length > 1 ? children : children[0];

export default (component, props, ...children) => {
    if (isPureSFComponent(component)) {
        return component({ ...component.defaultProps, ...props, children: formatChildren(children) }, {});
    }

    return React.createElement(component, props, ...children);
};
