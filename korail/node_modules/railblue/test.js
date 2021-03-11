const { GetMetroArriveInfo, GetMetroTimeTable, Flags } = require("./index.js");
const fetch = require('node-fetch');

(async () => {

    const addHours = function (date, h) {
        date.setTime(date.getTime() + (h * 60 * 60 * 1000));
        return date;
    }
    
    const addMinutes = function (date, m) {
        if (m == NaN) m = 0;
        date.setTime(date.getTime() + (m * 60 * 1000));
        return date;
    }

    console.log(new Date().toString());
    console.log(addHours(new Date(), 5).toString());

    var api = new GetMetroArriveInfo("수원", addHours(new Date(), 6));
    var data = await api.GetResult();
    var arr = data.split('\n');
    console.log(data);
    for (var i = 1; i < arr.length; i++) {
        var data = arr[i].trim();
        if (!data) continue;
        console.log(parseArrive(data).arv_p_ts);
    }
})();

function parseArrive(h) {
    var k = h.split('|');
    return {
        trn_no: k[0], //열차 번호
        trn_kind: k[3], //열차 종류
        arv_stn_nm: k[1], //시발역 이름
        dep_stn_nm: k[2], //종착역 이름
        arv_p_ts: k[15], //종착 시간
        arv_ts: k[4], //도착 시간
        dep_ts: k[5], //출발 시간
        type: k[6], //dest = 시발, dept = 종착, stop = 정차
        updown: k[7], //1 = 상행, 0 = 하행
        location: k[9], //열차 현재 위치
        status: k[10], //열차 상태
        remain: k[12], //남은 역
        late: k[13] //지연
    }
}