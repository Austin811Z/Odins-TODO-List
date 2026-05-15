const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',

        entry: './src/js/main.js',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction 
                ? 'js/bundle.[contenthash].js'     // Cache busting in production
                : 'js/bundle.js',
            clean: true,                           // Clean dist folder before build
        },

        devtool: isProduction ? false : 'source-map', // Source maps only in development

        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            open: true,
            hot: true,
            port: 3000,
            historyApiFallback: true,
        },

        plugins: [
            new CleanWebpackPlugin(), // Cleans dist folder on each build

            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                inject: 'body',
                minify: isProduction ? {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                } : false
            }),

            new CopyWebpackPlugin({
                patterns: [
                    { 
                        from: 'src/assets', 
                        to: 'assets',
                        noErrorOnMissing: true 
                    }
                ]
            })
        ],

        module: {
            rules: [
                // CSS Support
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },

                // Image Support
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext]'
                    }
                }
            ]
        },

        resolve: {
            extensions: ['.js', '.css']
        },

        performance: {
            hints: isProduction ? 'warning' : false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },

        optimization: {
            minimize: isProduction,
            splitChunks: isProduction ? {
                chunks: 'all',
            } : false
        }
    };
};