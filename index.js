const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");
const port = 3000;
const server = restify.createServer();

const cors = corsMiddleware({
  origins: ["*"],
});

server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

const getConnections = () => {
  return server.server.getConnections((error, count) => {
    return count;
  });
};

server.get("/getCount", (req, res) => {
  const { _connections } = getConnections();
  res.send({ ConcurrentHTTPConnections: _connections });
});

server.get("/delay/:time", (req, res) => {  //localhost:3000/delay/<time in milliseconds>
  res.write(`took ${req.params.time} miliseconds to response`);
  setTimeout(function () {
    res.end();
  }, req.params.time);
});

server.listen(port, () => console.info(`Server is up on ${port}.`));
