module.exports = {
    assetsDir: "static",
    // 修改的配置
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://127.0.0.1:9090',
                target: "http://115.28.79.206:9090",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': '/api'
                }
            }
        }
    }
}