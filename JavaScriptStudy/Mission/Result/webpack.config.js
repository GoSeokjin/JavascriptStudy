var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
    new ExtractTextPlugin('style.css'),
];

module.exports = {
    //entry 진입점 require, @import 등 모듈간의 의존성을 순차적으로 해석
    entry: {
        // key : path
        bundle: __dirname + '/js/entry.js'
    },
    output: {
        //빌드 결과물이 들어갈 (webpack.config.js로부터의) 상대 경로
        path: './public/',
        //웹사이트에서 해당 에셋에 접근하기 위해 필요한 경로
        publicPath: './public/',
        //각 번들들의 파일명.
        //[name] : entry에서의 key 값 , [hash] : 컴파일의 md5 해시값 , [chunkhash] : 해당 청크(번들)의 해시값
        filename: '[name].js'
    },
    //require(모듈명)에서의 모듈명을 어떻게 해석할지에 대한 옵션. 모듈 탐색을 시작할 루트 경로. node의 모듈 시스템과 마찬가지로, 하위 폴더가 아닌 상위 폴더로 탐색을 진행한다.
    resolve: {
        // 모듈명 뒤에 여기 명시된 확장자명들을 붙여보며 탐색을 수행한다.
        // 즉, 위의 설정 파일에서처럼 extensions: ['', '.js', '.css'] 으로 설정되어 있으면
        // require('abc')를 resolve 하기 위해 abc, abc,js, abc.css를 탐색한다.
        // entry.js를 보면 styleEntry.scss를 require할 때는 확장자까지 명시했음을 볼 수 있다. 이 옵션에 'scss'가 포함되어 있지 않기 때문.
        extensions: ['.js', '.css' , '.scss']
    },
    //의존성 트리 내의 각 모듈들을 어떻게 핸들링할지에 대한 옵션.
    module: {
        //특정 모듈을 어떤 로더들을 거쳐 불러올지에 대한 설정. 모듈의 파일명이 특정 조건을 만족하면 (test - 정규식) 특정 로더들을 적용하라는 (loader(s)) 규칙들의 배열. 이 때, 로더들은 오른쪽에서 왼쪽의 순서로 적용된다는 점에 유의하자.
        rules: [
            { test: /\.js$/, exclude: '/node_modules', use: 'babel-loader' },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.html$/, use: ['html-loader'] }
        ]
    },
    //로더는 각 모듈을 어떻게 불러올 것인가를 담당한다고 이야기했다. 이 때, 각 모듈이 아닌, 번들링이 끝난 뒤 최종적으로 나온 번들을 조작하고 싶은 경우엔 어떻게 해야할까? 이 때 필요한게 플러그인 이다
    plugins: plugins
};