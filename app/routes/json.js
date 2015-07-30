var express = require('express');
var geoip = require('geoip-lite');

var router = express.Router();

var lookupAddress = function (remoteIP) {
  ipObj = geoip.lookup(remoteIP);
  if (ipObj !== null) {
    // Transform maxmind lookup result to freegeoip's format
    var freegeoIpObj = {
      ip: remoteIP,
      country_code: ipObj.country,
      //country_name: "",
      //region_code: "",
      region_name: ipObj.region,
      city: ipObj.city,
      //zip_code: "",
      //time_zone: "",
      latitude: ipObj.ll[0],
      longitude: ipObj.ll[1],
      metro_code: ipObj.metro
    };
    return freegeoIpObj;
  } else {
    return null;
  }
};

/* GET JSON output. */
router.get('/', function(req, res, next) {
  var remoteIP = req.connection.remoteAddress;
  console.log(JSON.stringify(req.headers, 2, null));
  if (req.headers['x-forwarded-for']) {
    // found a proxy header, using that as the IP
    remoteIP = req.headers['x-forwarded-for'].split(',')[0].trim();
  }

  //console.log('looking up by visitor IP (' + remoteIP + ')\n');

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  ipObj = lookupAddress(remoteIP);
  if (ipObj !== null) {
    res.json(ipObj);
  } else {
    res.status(400).send('Bad request');
  }
});

router.get('/:ip', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  ipObj = lookupAddress(req.params.ip);
  if (ipObj !== null) {
    res.json(ipObj);
  } else {
    res.status(400).send('Bad request');
  }
});

module.exports = router;
