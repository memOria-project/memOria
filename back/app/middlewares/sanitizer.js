const sanitizeHtml = require('sanitize-html');

module.exports = (request, response, next) => {
        for (const propName in request.body) {
            console.log(`${propName} before sanitizer ${request.body[propName]}`)
            request.body[propName] = sanitizeHtml(request.body[propName])
            console.log(`${propName} after sanitizer ${request.body[propName]}`)
          }
        next();
    }