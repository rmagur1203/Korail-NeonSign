import Base from "./Base.js";
import SixDigitDate from "./SixDigitDate.js";

const Version = 20200801;
export const GetMetroTimeTable_Flags = Object.freeze({
    방향_상행: 1,
    방향_하행: 2,
    열차종별_고속: 64,
    열차종별_여객: 128,
    열차종별_화물: 256,
    열차종별_기타: 512,
    옵션_당역출발: 16,
    옵션_당역종착: 32,
    경유역_경유역출발: 16,
    경유역_경유역종착: 32,
    경유역_통과: 2048
});

const Flags = GetMetroTimeTable_Flags;

export class GetMetroTimeTable extends Base {
    constructor(station: string,
        date = new Date(),
        page = 0,
        hr = Hour(new Date()),
        min = Minute(new Date()),
        directionFlag = Flags.방향_상행 | Flags.방향_하행,
        typeFlag = Flags.열차종별_고속 | Flags.열차종별_여객 | Flags.열차종별_화물 | Flags.열차종별_기타,
        viaStation = "",
        viaOption = Flags.경유역_경유역출발 | Flags.경유역_경유역종착) {
        super();
        this.request(`https://rail.blue/railroad/logis/getmetrotimetable.aspx?`
            + `pageIndex=${page}`
            + `&date=${SixDigitDate(date)}`
            + `&hr=${hr}`
            + `&min=${min}`
            + `&updn=${directionFlag}`
            + `&station=${encodeURI(station)}`
            + `&type=${typeFlag}`
            + `&via=${viaStation}`
            + `&viaopt=${viaOption}`
            + `&version=${Version}`);
    }

    async GetResult() {
        return await this.Task;
    }
}

export function Hour(date: Date) {
    return date.getHours();
}
export function Minute(date: Date) {
    return Math.floor(date.getMinutes() / 10) * 10;
}