const {createProxyMiddleware} = require('http-proxy-middleware');
var url
if(process.env.NODE_ENV==="production")
{
    url='https://onilne-quiz-portal.herokuapp.com'
}
else
{
    url='https://localhost:3001'
}
module.exports = function(app) {
    app.use(
        '/database',
        createProxyMiddleware({
            target:url,
            changeOrigin:true
        })
    )
}