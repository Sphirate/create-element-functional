require("babel-register");
const { expect } = require('chai');
const sinon = require('sinon');

const { createElementFactory } = require('./../src/index');

const {
    PureSFComponentWithoutDefaults,
    PureSFComponentWithDefaults,
    SFComponentWithContext,
} = require('./components');

const defaultRendererSpy = sinon.spy();
const renderer = createElementFactory(defaultRendererSpy);

describe('createElement', function() {
    afterEach(function() {
        PureSFComponentWithoutDefaults.reset();
        PureSFComponentWithDefaults.reset();
        SFComponentWithContext.reset();
        defaultRendererSpy.reset();
    });

    describe('with pure stateless functional component without default props', function() {
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
    });

});