import Base from './Base.js';
import SixDigitDate from './SixDigitDate.js';

export class SearchTrainInfo extends Base {
  constructor(date: Date, number: number, d?: string) {
    super();
    const data = {
      act: "SearchTrainInfo",
      q: number,
      d: d || SixDigitDate(date),
      h: null,
      q2: null
    }
    this.request(data);
  }
}