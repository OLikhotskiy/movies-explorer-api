const allowedCors = [
  'http://api.project-movies-exp.nomoredomains.rocks',
  'https://api.project-movies-exp.nomoredomains.rocks',
  'http://51.250.87.238',
  'https://51.250.87.238',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
