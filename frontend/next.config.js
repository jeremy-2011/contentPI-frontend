// Dependencies
const withSass = require('@zeit/next-sass')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[name]__[local]__[hash:base64:5]'
  },
  devIndicators: {
    autoPrerender: false
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    const dir = __dirname

    // Aliases
    config.resolve.alias['@app'] = path.resolve(dir, './src/app')
    config.resolve.alias['@dashboard'] = path.resolve(dir, './src/app/dashboard')
    config.resolve.alias['@config'] = path.resolve(dir, './src/config')
    config.resolve.alias['@constants'] = path.resolve(dir, './src/constants')
    config.resolve.alias['@contexts'] = path.resolve(dir, './src/contexts')
    config.resolve.alias['@graphql'] = path.resolve(dir, './src/graphql')
    config.resolve.alias['@interfaces'] = path.resolve(dir, './src/interfaces')
    config.resolve.alias['@modals'] = path.resolve(dir, './src/app/dashboard/components/Modals')
    config.resolve.alias['@pages'] = path.resolve(dir, './src/pages')
    config.resolve.alias['@shared'] = path.resolve(dir, './src/shared')
    config.resolve.alias['@lib'] = path.resolve(dir, './src/shared/lib')
    config.resolve.alias['@hooks'] = path.resolve(dir, './src/shared/lib/hooks')
    config.resolve.alias['@layouts'] = path.resolve(dir, './src/shared/components/layouts')
    config.resolve.alias['@ui'] = path.resolve(dir, './src/shared/components/ui')
    config.resolve.alias.styles = path.resolve(dir, './src/shared/styles')

    // Plugins
    config.plugins.push(
      new Dotenv({
        silent: true
      }),
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      })
    )

    return config
  }
})
