import NumberPadding from './NumberPadding.js';

export default function(date: Date) {
    return SixDigitDate(date);
}

export function SixDigitDate(date: Date) {
    return NumberPadding(date.getFullYear(), 4) + NumberPadding(date.getMonth() + 1, 2) + NumberPadding(date.getDate(), 2);
}