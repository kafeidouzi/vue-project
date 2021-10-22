const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CheckerPlugin} = require('awesome-typescript-loader')
module.exports = {
    entry: {
        'app':'./src/index.tsx'
    },
    output: {
        filename: '[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader',
                    options:{
                        transpileOnly:true   //只做语言转换，不做类型检查
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options:{
                        transpileOnly:true   //只做语言转换，不做类型检查
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/tpl/index.html'
        }),
        // new ForkTsCheckerWebpackPlugin()  //会在另一个地方进行类型检查，不会影响便以速度
        new CheckerPlugin()
    ],
    optimization:{    //react的打包很庞大，可以拆包
        splitChunks: {  
            chunks:'all'  //设置为all，会默认吧node_modules文件单独打包成一个vendor文件
        }
    }
}
