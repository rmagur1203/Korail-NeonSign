export default function FormEncode(json: any) {
    const keys = Object.keys(json)
    const form = []
    for (let i = 0, l = keys.length; i < l; i++) {
        form.push(encodeURI(keys[i]) + '=' + encode(json[keys[i]]))
    }
    return form.join('&')
}

function encode(data: string) {
    if (data == null)
        return "";
    return encodeURI(data);
}