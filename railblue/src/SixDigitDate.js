import NumberPadding from './NumberPadding.js';

export default function SixDigitDate(date) {
    return NumberPadding(date.getFullYear(), 4) + NumberPadding(date.getMonth() + 1, 2) + NumberPadding(date.getDate(), 2);
}