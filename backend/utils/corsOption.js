const corsOption = {
  origin: [
    'https://api.leonov.nomoredomains.sbs',
    'http://api.leonov.nomoredomains.sbs',
    'http:/localhost:3000',
  ],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Origin', 'Autorization'],
};
module.exports = corsOption;
