import Base from './Base.js';
import SixDigitDate from './SixDigitDate.js';

export class DisplayDriveTrainList2 extends Base {
  constructor(date) {
    super();
    const data = {
      act: "DisplayDriveTrainList2",
      q: null,
      d: SixDigitDate(date),
      h: null,
      q2: null
    }
    this.request(data);
  }
}