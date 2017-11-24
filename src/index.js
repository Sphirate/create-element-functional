import { createElement, Component } from 'react';

const isPureSFComponent = (component) => (
    typeof component === 'function' &&
    component.prototype instanceof Component === false &&
    !component.contextTypes
);

const formatChildren = (children) => children.length > 1 ? children : children[0];

export const createElementFactory = renderer => (component, props, ...children) => {
    if (isPureSFComponent(component)) {
        return component({ ...component.defaultProps, ...props, children: formatChildren(children) }, {});
    }

    return renderer(component, props, ...children);
};

export default createElementFactory(createElement);