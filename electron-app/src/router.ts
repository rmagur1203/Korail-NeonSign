import { Router } from 'express';
import { DisplayDriveTrainList2, SearchTrainInfo, SixDigitDate } from 'nxlogis-ts';
import { GetMetroArriveInfo } from 'railblue-ts';
var router = Router();

router.get('/ddtl2', async (req, res, next) => {
    var api = new DisplayDriveTrainList2(new Date());
    res.json(await api.GetResult());
});

router.get('/GetMetroArriveInfo', async function (req, res, next) {
    if (typeof req.query.name != "string") return;
    var api = new GetMetroArriveInfo(req.query.name);
    res.send(await api.GetParse());
});

router.get('/stationtrains', async function (req, res, next) {
    if (typeof req.query.name != "string") return res.json([]);

    var api = new DisplayDriveTrainList2(new Date());
    var data = await api.GetResult();
    var trains = data.data.trains;
    trains = trains.filter((value: any) => {
        var dep = Time(value.dep_p_ts);
        return dep > new Date();
    });

    let queryName = req.query.name;
    var out = [];
    for (var i = 0; i < trains.length; i++) {
        if (out.length >= 10) continue;
        if (trains[i].ops_dd != SixDigitDate(new Date())) continue;
        var api = new SearchTrainInfo(new Date(), trains[i].trn_no);
        var data = await api.GetResult();
        data = data.data.schedule;
        if (data == undefined) continue;
        var check = data.some((value: any) => value.stn_nm == decodeURI(queryName) && Time(value.arv_p_ts).getMinutes + value.arv_delay >= new Date().getMinutes());
        if (check) out.push({ schedule: data, train: trains[i] });
    }
    res.json(out);

    function Time(str: string) {
        var date = new Date();
        var arr = str.split(':');
        date.setHours(parseInt(arr[0]));
        date.setMinutes(parseInt(arr[1]));
        date.setSeconds(parseInt(arr[2]));
        return date;
    }
});

export default router;