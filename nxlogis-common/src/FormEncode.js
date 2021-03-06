export default function FormEncode(json) {
    const keys = Object.keys(json)
    const form = []
    for (let i = 0, l = keys.length; i < l; i++) {
        form.push(encodeURI(keys[i]) + '=' + encode(json[keys[i]]))
    }
    return form.join('&')
}

function encode(data) {
    if (data == null)
        return "";
    return encodeURI(data)
}