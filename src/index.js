import React from 'react';

const isPureSFComponent = (component) => (
    typeof component === 'function' &&
    component.prototype instanceof React.Component === false &&
    !component.contextTypes
);

const formatChildren = (children) => children.length > 1 ? children : children[0];

export default (component, props, ...children) => {
    if (isPureSFComponent(component)) {
        const combinedProps = { ...component.defaultProps, ...props };
        if (children.length > 0) {
            combinedProps.children = formatChildren(children);
        }
        return component(combinedProps, {});
    }

    return React.createElement(component, props, ...children);
};
