import React from 'react';

export const renderer = (component, props, ...children) => {
  if (typeof component === 'function' && component.prototype instanceof React.Component === false) {
    return component(Object.assign({}, component.defaultProps, { ...props, children }));
  }

  return React.createElement(component, props, ...children);
};
