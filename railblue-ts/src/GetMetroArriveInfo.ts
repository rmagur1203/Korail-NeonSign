import Base from "./Base.js";
import SixDigitDate from "./SixDigitDate.js";

export class GetMetroArriveInfo extends Base {
    constructor(station: string, date = new Date(), skip = false) {
        super();
        this.request(`https://rail.blue/railroad/logis/getmetroarriveinfo.aspx?`
            + `date=${SixDigitDate(date)}`
            + `&station=${encodeURI(station)}`
            + `&skip=${skip}`);
    }

    async GetResult() {
        return await this.Task;
    }

    async GetParse() {
        return parseData(await this.Task);
    }
}

function parseData(data: string) {
    var arr = data.split('\n');
    var res = { date: arr[0], trains: new Array() }
    for (var i = 1; i < arr.length; i++) {
        var data = arr[i].trim();
        if (!data) continue;
        res.trains.push(parseArrive(data));
    }
    return res;
}

function parseArrive(h: string) {
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