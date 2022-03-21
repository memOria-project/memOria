const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

module.exports = (request, response, next) => {
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  for (const propName in request.body) {
      if (propName !== "tag")
        {request.body[propName] = DOMPurify.sanitize(request.body[propName], {USE_PROFILES: {html: true}})}
  }
  next();
}