var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {    //별도의 express서버없이도 테스트할수있는 서버를 열수 있다.
        hot: true, //수정될때마다 리로딩
        inline: true, // 변경사항을 번들에 넣어주는것
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/', // 인덱스 파일의 위치
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?' + JSON.stringify({
                cacheDirectory: true,
                presets: ['es2015', 'react']
            })],
            exclude: /node_modules/,
        }]
    },

    plugins: [new webpack.HotModuleReplacementPlugin()]
};
