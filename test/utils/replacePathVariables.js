const assert = require('assert');
const { suite, describe, test } = require('mocha');

const { replacePathVariables } = require('../../src/utils/templatedPath');

const fileString = '/foo/bar/baz.x';
const fileObject = {
    file: '/foo/bar/baz.x',
    path: '/foo/bar/',
    base: 'baz.x',
    name: 'baz',
    ext: '.x'
};

suite('Utils/replacePathVariables', () => {

    describe('Replace [file]', () => {
        [ fileString, fileObject ].forEach( opts => {

            test(`Replace [file] -- ${typeof opts}`, () => {
                let _replaced = replacePathVariables( '[file]', opts );
                // console.log( _replaced );

                assert.strictEqual(_replaced, '/foo/bar/baz.x');
            });

        });
    });

    describe('Replace [path]', () => {
        [ fileString, fileObject ].forEach( opts => {

            test(`Replace [path] -- ${typeof opts}`, () => {
                let _replaced = replacePathVariables( '[path]', opts );
                // console.log( _replaced );

                assert.strictEqual(_replaced, '/foo/bar/');
            });

        });
    });

    describe('Replace [base]', () => {
        [ fileString, fileObject ].forEach( opts => {

            test(`Replace [base] -- ${typeof opts}`, () => {
                let _replaced = replacePathVariables( '[base]', opts );
                // console.log( _replaced );

                assert.strictEqual(_replaced, 'baz.x');
            });

        });
    });

    describe('Replace [name]', () => {
        [ fileString, fileObject ].forEach( opts => {

            test(`Replace [name] -- ${typeof opts}`, () => {
                let _replaced = replacePathVariables( '[name]', opts );
                // console.log( _replaced );

                assert.strictEqual(_replaced, 'baz');
            });

        });
    });

    describe('Replace [ext]', () => {
        [ fileString, fileObject ].forEach( opts => {

            test(`Replace [ext] -- ${typeof opts}`, () => {
                let _replaced = replacePathVariables( '[ext]', opts );
                // console.log( _replaced );

                assert.strictEqual(_replaced, '.x');
            });

        });
    });

});
