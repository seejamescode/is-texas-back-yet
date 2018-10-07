const compression = require("compression");
const express = require("express");
const next = require("next");
const { join } = require("path");
const schedule = require("./schedule");

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    server.enable("trust proxy");
    server.use(compression());
    server.use(function(req, res, next) {
      if (req.secure || isDev) {
        next();
      } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
      }
    });

    schedule(server);

    server.use("/service-worker.js", (req, res) => {
      app.serveStatic(req, res, join(__dirname, "../.next/service-worker.js"));
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`App is live at http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
