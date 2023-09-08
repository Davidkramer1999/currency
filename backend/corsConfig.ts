export const corsOptions = {
  origin: function (origin: any, callback: any) {
    const whitelist = ["http://localhost:3001"];
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
