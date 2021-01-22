const assert = require('assert');
const { suite, describe, test } = require('mocha');

const { replacePathVariables } = require('../../src/utils/templatedPath');

const filename = '/foo/bar/baz.x';

suite('Utils/replacePathVariables', () => {

    describe('Replace [file]', () => {

        test('Replace [file]', () => {
            let _replaced = replacePathVariables( '[file]', { filename } );
            // console.log( _replaced );

            assert.strictEqual(_replaced, '/foo/bar/baz.x');
        });

    });

    describe('Replace [path]', () => {

        test('Replace [path]', () => {
            let _replaced = replacePathVariables( '[path]', { filename } );
            // console.log( _replaced );

            assert.strictEqual(_replaced, '/foo/bar/');
        });

    });

    describe('Replace [base]', () => {

        test('Replace [base]', () => {
            let _replaced = replacePathVariables( '[base]', { filename } );
            // console.log( _replaced );

            assert.strictEqual(_replaced, 'baz.x');
        });

    });

    describe('Replace [name]', () => {

        test('Replace [name]', () => {
            let _replaced = replacePathVariables( '[name]', { filename } );
            // console.log( _replaced );

            assert.strictEqual(_replaced, 'baz');
        });

    });

    describe('Replace [ext]', () => {

        test('Replace [ext]', () => {
            let _replaced = replacePathVariables( '[ext]', { filename } );
            // console.log( _replaced );

            assert.strictEqual(_replaced, '.x');
        });

    });

});
