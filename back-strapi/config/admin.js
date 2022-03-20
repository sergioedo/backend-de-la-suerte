module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8ecc20253d9009c3db7e1924536743e7'),
  },
});
