import React from 'react';

export default (component, props, ...children) => {
    if (
        typeof component === 'function' &&
        component.prototype instanceof React.Component === false &&
        !component.contextTypes
    ) {
        return component(Object.assign({}, component.defaultProps, { ...props, children }), {});
    }

    return React.createElement(component, props, ...children);
};
