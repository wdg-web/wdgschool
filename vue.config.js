const path = require('path')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        './' : '/',
    // 新增
    // assetsPublicPath: './',

    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
        const fileRule = config.module.rule('file');
        fileRule.uses.clear();
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/icons/svg'))
            .end()
            .use('file-loader')
            .loader('file-loader');
    },
    //配置axios跨域请求
    devServer: {
        proxy: {
            '/api': { //访问路径，可以自己设置，
                target: 'http://47.108.117.85:8888',
                //代理接口，即后端运行所在的端口
                // target: 'http://127.0.0.1:8888', //代理接口，即后端运行所在的端口
                // ws: true,
                changeOrigin: true, //设置是否跨域
                pathRewrite: { //访问路径重写
                    '^/api': ''
                }
            }
        }
    }
}