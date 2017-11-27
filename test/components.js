const React = require('react');
const sinon = require('sinon');

const PureSFComponentWithoutDefaults = sinon.spy();
const PureSFComponentWithDefaults = sinon.spy();
PureSFComponentWithDefaults.defaultProps = {
    string: "string",
    zero: 0,
    one: 1,
    truth: true,
    lie: false,
    array: [],
};

const SFComponentWithContext = sinon.spy();
SFComponentWithContext.contextTypes = {};

class ReactPureComponent extends React.PureComponent {}
class ReactComponent extends React.Component {}

module.exports = {
    PureSFComponentWithoutDefaults,
    PureSFComponentWithDefaults,
    SFComponentWithContext,
    ReactPureComponent,
    ReactComponent,
};
