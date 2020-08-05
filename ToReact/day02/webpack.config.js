module.exports = {
    entry: {
        main: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [[
                            '@babel/plugin-transform-react-jsx',
                            {pragma:'ToyReact.createElement'}
                        ]],
                    },
                },
            },
        ],
    },
    mode: 'development',
    optimization: {
        minimize: false
    }
  };