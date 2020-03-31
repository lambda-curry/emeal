import cors from 'cors';
const corsWhitelist = ['app.emeal.me', 'local.emeal.me', 'localhost'];
const corsOptions = {
  credentials: true,
  origin: function(origin: string, callback: any) {
    if (!origin || corsWhitelist.some(host => origin.indexOf(host) > -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

export const corsMiddleware = cors(corsOptions);
