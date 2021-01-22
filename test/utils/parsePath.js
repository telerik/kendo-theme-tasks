const assert = require('assert');
const { suite, describe, test } = require('mocha');

const { parsePath } = require('../../src/utils/templatedPath');

suite('Utils/parsePath', () => {


    describe('absolute paths', () => {

        test('Parse /', () => {
            let _parsed = parsePath( '/', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/', path: '/', base: '', name: '', ext: '' }
            );
        });

        test('Parse /foo', () => {
            let _parsed = parsePath( '/foo', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/foo', path: '/', base: 'foo', name: 'foo', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse /foo.bar', () => {
            let _parsed = parsePath( '/foo.bar', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/foo.bar', path: '/', base: 'foo.bar', name: 'foo', ext: '.bar' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse /foo/bar', () => {
            let _parsed = parsePath( '/foo/bar', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/foo/bar', path: '/foo/', base: 'bar', name: 'bar', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse /foo/bar.baz', () => {
            let _parsed = parsePath( '/foo/bar.baz', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/foo/bar.baz', path: '/foo/', base: 'bar.baz', name: 'bar', ext: '.baz' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse /foo/bar/baz', () => {
            let _parsed = parsePath( '/foo/bar/baz', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/foo/bar/baz', path: '/foo/bar/', base: 'baz', name: 'baz', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse /foo/bar/baz.x', () => {
            let _parsed = parsePath( '/foo/bar/baz.x', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '/foo/bar/baz.x', path: '/foo/bar/', base: 'baz.x', name: 'baz', ext: '.x' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

    });


    describe('relative paths', () => {

        test('Parse ""', () => {
            let _parsed = parsePath( '', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '', path: '', base: '', name: '', ext: '' }
            );
        });

        test('Parse foo', () => {
            let _parsed = parsePath( 'foo', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo', path: '', base: 'foo', name: 'foo', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse foo.bar', () => {
            let _parsed = parsePath( 'foo.bar', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo.bar', path: '', base: 'foo.bar', name: 'foo', ext: '.bar' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse foo/bar', () => {
            let _parsed = parsePath( 'foo/bar', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar', path: 'foo/', base: 'bar', name: 'bar', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse foo/bar.baz', () => {
            let _parsed = parsePath( 'foo/bar.baz', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar.baz', path: 'foo/', base: 'bar.baz', name: 'bar', ext: '.baz' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse foo/bar/baz', () => {
            let _parsed = parsePath( 'foo/bar/baz', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar/baz', path: 'foo/bar/', base: 'baz', name: 'baz', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse foo/bar/baz.x', () => {
            let _parsed = parsePath( 'foo/bar/baz.x', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar/baz.x', path: 'foo/bar/', base: 'baz.x', name: 'baz', ext: '.x' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

    });


    describe('dot paths', () => {

        test('Parse ./', () => {
            let _parsed = parsePath( './', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: '', path: '', base: '', name: '', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse ./foo', () => {
            let _parsed = parsePath( './foo', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo', path: '', base: 'foo', name: 'foo', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse ./foo.bar', () => {
            let _parsed = parsePath( './foo.bar', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo.bar', path: '', base: 'foo.bar', name: 'foo', ext: '.bar' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse ./foo/bar', () => {
            let _parsed = parsePath( './foo/bar', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar', path: 'foo/', base: 'bar', name: 'bar', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse ./foo/bar.baz', () => {
            let _parsed = parsePath( './foo/bar.baz', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar.baz', path: 'foo/', base: 'bar.baz', name: 'bar', ext: '.baz' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse ./foo/bar/baz', () => {
            let _parsed = parsePath( './foo/bar/baz', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar/baz', path: 'foo/bar/', base: 'baz', name: 'baz', ext: '' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

        test('Parse ./foo/bar/baz.x', () => {
            let _parsed = parsePath( './foo/bar/baz.x', false );
            // console.log(_parsed);

            assert.deepStrictEqual(
                _parsed,
                { file: 'foo/bar/baz.x', path: 'foo/bar/', base: 'baz.x', name: 'baz', ext: '.x' }
            );
            assert.strictEqual( _parsed.base, `${_parsed.name}${_parsed.ext}` );
            assert.strictEqual( _parsed.file, `${_parsed.path}${_parsed.base}` );
        });

    });


});
