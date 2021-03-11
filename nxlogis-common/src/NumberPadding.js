export default function(n, width) {
    n = n.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}