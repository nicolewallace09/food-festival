const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// webpack properties: entry, output, and mode 
// modifying for multiple entry points - for each of our pages 
module.exports = {
    entry: {
        app: './assets/js/script.js',
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // build will create a series of bundled files for each entry object 
        filename: '[name].bundle.js'
    },
    // file-loader for images 
    module: {
        rules: [
          {
            // looking for a regex for image files with extension .jpg
            test: /\.jpg$/i,
            use: [
                {
                    loader: "file-loader",
                    options: {
                      name (file) {
                        return "[path][name].[ext]"
                      },
                      publicPath: function(url) {
                          return url.replace("../", "/assets/")
                      }
                    }
                 },
                 {
                    loader: 'image-webpack-loader'
                  }
            ]
          }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery", 
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development',

}; 

