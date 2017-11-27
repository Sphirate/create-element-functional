require("babel-register");
const { expect } = require('chai');
const sinon = require('sinon');

const { createElementFactory } = require('./../src/index');

const {
    PureSFComponentWithoutDefaults,
    PureSFComponentWithDefaults,
    SFComponentWithContext,
    ReactPureComponent,
    ReactComponent,
} = require('./components');

const defaultRendererSpy = sinon.spy();
const renderer = createElementFactory(defaultRendererSpy);

describe('createElement', function() {

    describe('with pure stateless functional component without default props', function() {
        afterEach(function() {
            PureSFComponentWithoutDefaults.reset();
        });
        
        it('should execute it as function', function() {
            renderer(PureSFComponentWithoutDefaults);
            expect(PureSFComponentWithoutDefaults.called).is.true;
        });

        it('should execute it with empty props if they are not specified', function() {
            renderer(PureSFComponentWithoutDefaults);
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.be.empty;
        });
        
        it('should execute it with empty props if they are empty', function() {
            renderer(PureSFComponentWithoutDefaults, {});
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.be.empty;
        });
        
        it('should execute it with provided props', function() {
            const props = { string: "string", lie: false, truth: true };
            renderer(PureSFComponentWithoutDefaults, props);
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.include(props);
        });

        it('should execute it with provided children prop as array of children', function() {
            renderer(PureSFComponentWithoutDefaults, {}, 1, 2, 3);
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.deep.include({ children: [1, 2, 3] });
        });

        it('should execute it with provided children prop as single child', function() {
            renderer(PureSFComponentWithoutDefaults, {}, 1);
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.include({ children: 1 });
        });
        
        it('should execute it with provided children prop from original props', function() {
            const props = { children: [1, 2, 3] };
            renderer(PureSFComponentWithoutDefaults, props);
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.include(props);
        });
        
        it('should execute it and rewrite original children prop by children', function() {
            const props = { children: [1, 2, 3] };
            renderer(PureSFComponentWithoutDefaults, props, 1);
            expect(PureSFComponentWithoutDefaults.args[0][0]).to.include({ children: 1 });
        });
    });

    describe('with pure stateless functional component with default props', function() {
        afterEach(function() {
            PureSFComponentWithDefaults.reset();
        });

        it('should execute it as function', function() {
            renderer(PureSFComponentWithDefaults);
            expect(PureSFComponentWithDefaults.called).is.true;
        });

        it('should execute it with default props if props are not specified', function() {
            renderer(PureSFComponentWithDefaults);
            expect(PureSFComponentWithDefaults.args[0][0]).to.include(PureSFComponentWithDefaults.defaultProps);
        });
        
        it('should execute it with default props if props are empty', function() {
            renderer(PureSFComponentWithDefaults, {});
            expect(PureSFComponentWithDefaults.args[0][0]).to.include(PureSFComponentWithDefaults.defaultProps);
        });
        
        it('should execute it with provided props', function() {
            const props = { string: "string1", zero: 1, one: 2, lie: true, truth: false, array: undefined };
            renderer(PureSFComponentWithDefaults, props);
            expect(PureSFComponentWithDefaults.args[0][0]).to.include(props);
        });

        it('should execute it with provided children prop as array of children', function() {
            renderer(PureSFComponentWithDefaults, {}, 1, 2, 3);
            expect(PureSFComponentWithDefaults.args[0][0]).to.deep.include(
                Object.assign({}, PureSFComponentWithDefaults.defaultProps, { children: [1, 2, 3] }),
            );
        });

        it('should execute it with provided children prop as single child', function() {
            renderer(PureSFComponentWithDefaults, {}, 1);
            expect(PureSFComponentWithDefaults.args[0][0]).to.include(
                Object.assign({}, PureSFComponentWithDefaults.defaultProps, { children: 1 }),
            );
        });
        
        it('should execute it with provided children prop from original props', function() {
            const props = { children: [1, 2, 3] };
            renderer(PureSFComponentWithDefaults, props);
            expect(PureSFComponentWithDefaults.args[0][0]).to.include(
                Object.assign({}, PureSFComponentWithDefaults.defaultProps, props),
            );
        });
        
        it('should execute it and rewrite original children prop by children', function() {
            const props = { children: [1, 2, 3] };
            renderer(PureSFComponentWithDefaults, props, 1);
            expect(PureSFComponentWithDefaults.args[0][0]).to.include(
                Object.assign({}, PureSFComponentWithDefaults.defaultProps, { children: 1 }),
            );
        });
    });

    describe('with stateless functional component that uses context', function() {
        afterEach(function() {
            SFComponentWithContext.reset();
            defaultRendererSpy.reset();
        });

        it('should execute it as classic component', function() {
            renderer(SFComponentWithContext);
            expect(SFComponentWithContext.called).is.false;
            expect(defaultRendererSpy.called).is.true;
        });
    });
    
    describe('with string component', function() {
        afterEach(function() {
            defaultRendererSpy.reset();
        });

        it('should execute it as classic component', function() {
            renderer("div");
            expect(defaultRendererSpy.called).is.true;
        });
    });

    describe('with react component', function() {
        afterEach(function() {
            defaultRendererSpy.reset();
        });

        it('should execute `React.Component` as classic component', function() {
            renderer(ReactComponent);
            expect(defaultRendererSpy.called).is.true;
        });

        it('should execute `React.PureComponent` as classic component', function() {
            renderer(ReactPureComponent);
            expect(defaultRendererSpy.called).is.true;
        });

        it('should supply right type', function() {
            renderer(ReactComponent);
            expect(defaultRendererSpy.args[0][0]).is.equal(ReactComponent);
        });
        
        it('should supply right props', function() {
            const props = { string: "string1", zero: 1, one: 2, lie: true, truth: false, array: [1] };
            renderer(ReactComponent, props);
            expect(defaultRendererSpy.args[0][1]).is.equal(props);
        });

        it('should supply empty props', function() {
            renderer(ReactComponent, {});
            expect(defaultRendererSpy.args[0][1]).is.be.empty;
        });

        it('should not supply any children', function() {
            renderer(ReactComponent, {});
            expect(defaultRendererSpy.args[0].slice(2)).is.be.empty;
        });
        
        it('should not supply given children', function() {
            renderer(ReactComponent, {}, 1, 2, 3);
            expect(defaultRendererSpy.args[0].slice(2)).is.deep.equal([1, 2, 3]);
        });
    });

});