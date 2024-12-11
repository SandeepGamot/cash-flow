export const AppConfig = {
  constants: {
    amount: {
      min: 1,
      max: 10_00_00_000,
    },
    options: {
      maxLength: 30,
    },
    description: {
      maxLength: 80,
    },
  },
  origin: {
    domain: process.env.ORIGIN_DOMAIN || "cashflow-ui",
    url: process.env.ORIGIN_URL || "http://cashflow-ui:5173",
  },
  port: process.env.APP_PORT,
  db: {
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  auth: {
    google: {
      oauth: {
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_OAUTH_CALLBACK,
        scope: {
          userInfo: process.env.GOOGLE_OAUTH_SCOPE_USER_INFO,
          email: process.env.GOOGLE_OAUTH_SCOPE_EMAIL,
        },
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export const initConfig = () => require("dotenv").config();

