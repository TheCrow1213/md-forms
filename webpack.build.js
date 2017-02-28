import webpack from 'webpack'
import _debug from 'debug'
import buildConfig from './webpack.config.babel.js'

const debug = _debug('webpack:build')
const DEFAULT_STATS_FORMAT = {
  chunks : false,
  chunkModules : false,
  colors : true
}

function webpackCompiler(webpackConfig, statsFormat = DEFAULT_STATS_FORMAT) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      const jsonStats = stats.toJson()

      debug('Webpack compile completed.')
      debug(stats.toString(statsFormat))

      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

async function compile(config) {
  try {
    debug('Run compiler')
    const stats = await webpackCompiler(config)
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    debug('Copy static assets to dist folder.')
    // fs.copySync('src/static', config.output.path) // can webpack handle this?
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
}

compile(buildConfig)