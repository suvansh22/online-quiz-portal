const {createProxyMiddleware} = require('http-proxy-middleware');
var url
if(process.env.NODE_ENV==="production")
{
    url='https://onilne-quiz-portal.herokuapp.com'
}
else
{
    url='http://localhost:3001'
}
module.exports = function(app) {
    app.use(
        '/database',
        createProxyMiddleware({
            target:'https://onilne-quiz-portal.herokuapp.com',
            changeOrigin:true
        })
    )
}
