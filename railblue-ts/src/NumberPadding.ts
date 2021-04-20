export default function(n: number, width: number) {
    let j: string = n.toString();
    return (j.length >= width) ? j : (new Array(width - j.length + 1).join('0') + j);
}