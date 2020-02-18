// rollup.config.js
import babel from 'rollup-plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import resolve from '@rollup/plugin-node-resolve';

export default {
    external: [
        'react',
        'react-dom'
    ],
    input: 'src/index.js',
    output: {
        file: 'dist/js/bundle.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: '/node_modules/**'
        }),
        htmlTemplate({
            template: 'src/index.html',
            target: 'dist/index.html',
        }),
        resolve(),
    ],
};