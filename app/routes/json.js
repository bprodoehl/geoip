var express = require('express');
var router = express.Router();

/* GET JSON output. */
router.get('/', function(req, res, next) {
  var remoteIP = req.connection.remoteAddress;
  console.log(JSON.stringify(req.headers, 2, null));
  if (req.headers['x-forwarded-for']) {
    // found a proxy header, using that as the IP
    remoteIP = req.headers['x-forwarded-for'];
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //console.log('req.connection.remoteAddress: ', req.connection.remoteAddress);
  //console.log('req.connection.remotePort: ', req.connection.remotePort);
  res.send('looking up by visitor IP (' + remoteIP + ')\n');
});

router.get('/:ip', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.send('looking up info on ' + req.params.ip + '\n');
});

module.exports = router;
