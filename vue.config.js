module.exports = {
    assetsDir: "static",
    // 修改的配置
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://47.100.10.8:5000',
                target: "http://115.28.79.206:9090",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}