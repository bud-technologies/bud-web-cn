const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

let glob = require('glob');
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    tmp, htmls = {};
  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + 'html').forEach(function (entry) {
    tmp = entry.split('/').splice(-3);
    htmls[tmp[1]] = entry
  })
  // 读取src/pages/**/底下所有的js文件
  glob.sync(globPath + 'js').forEach(function (entry) {
    tmp = entry.split('/').splice(-3);
    entries[tmp[1]] = {
      entry,
      //  当前目录没有有html则以共用的public/index.html作为模板
      template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html',
      //  以文 m件夹名称.html作为访问地址
      filename: tmp[1] + '.html'
    };
  });
  return entries;
};
let htmls = getEntry('./src/entry/**/*.');

// TODO: publicPath
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? 'https://img.mumiweixin.com/2022/bud/sourcecn' : './',
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  productionSourceMap: false,
  // pages:htmls,
  pages: {
    index: 'src/main.js'
  },

  chainWebpack: (config) => {
    config.module.rule = [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    }];

    /* 添加分析工具 npm run app --report*/
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end();
        config.plugins.delete('prefetch')
      }
    }
  },

  configureWebpack: {
    externals: {
      'axios': 'axios',
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    },
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: []
      },
      stylus: {
        'resolve url': true,
        'import': []
      },
      sass: {
        additionalData: `@import "@/common/css/style.scss";`
      }
    }
  },
  devServer: {
    // open: process.platform === 'darwin',
    openPage: '/',
    open: true,
    host: '0.0.0.0', // 允许外部ip访问
    port: 8099, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
  }
}