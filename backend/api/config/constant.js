var url = 'http://localhost:'+process.env.PORT + '/api/public'

var globals = {
    IMAGE : url + "/images/",
    // BASE_URL: 'http://localhost/23-exam/api/',
    // PORT_BASE_URL : `http://localhost:${process.env.PORT}/api/v1/`,
    APP_NAME : "06-product"
}

module.exports = globals;