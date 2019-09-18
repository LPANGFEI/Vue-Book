module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.zhuishushenqi.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
