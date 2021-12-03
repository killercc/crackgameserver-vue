module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:7766",
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    },

}