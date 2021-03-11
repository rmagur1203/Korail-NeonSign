var express = require('express');
const { DisplayDriveTrainList2, SearchTrainInfo } = require('nxlogis-common');
const { GetMetroArriveInfo } = require('railblue')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/live', async function (req, res, next) {
  res.render('index-live', { title: 'Express' });
});

router.get('/ddtl2', async function (req, res, next) {
  var api = new DisplayDriveTrainList2(new Date());
  res.json(await api.GetResult());
});

router.get('/GetMetroArriveInfo', async function (req, res, next) {
  var api = new GetMetroArriveInfo(req.query.name);
  res.send(await api.GetParse());
});

router.get('/stationtrains', async function (req, res, next) {
  if (req.query.name == undefined) return res.json([]);

  var api = new DisplayDriveTrainList2(new Date());
  var data = await api.GetResult();
  var trains = data.data.trains;
  trains = trains.filter((value) => {
    var dep = Time(value.dep_p_ts);
    return dep > new Date();
  });

  var out = [];
  for (var i = 0; i < trains.length; i++) {
    if (out.length >= 10) continue;
    if (trains[i].ops_dd != SixDigitDate(new Date())) continue;
    var api = new SearchTrainInfo(new Date(), trains[i].trn_no);
    var data = await api.GetResult();
    data = data.data.schedule;
    if (data == undefined) continue;
    var check = data.some((value) => value.stn_nm == decodeURI(req.query.name) && Time(value.arv_p_ts).addMinutes(value.arv_delay) > new Date());
    if (check) out.push({ schedule: data, train: trains[i] });
  }
  res.json(out);

  function Time(str) {
    var date = new Date();
    var arr = str.split(':');
    date.setHours(arr[0]);
    date.setMinutes(arr[1]);
    date.setSeconds(arr[2]);
    return date;
  }
});

module.exports = router;
