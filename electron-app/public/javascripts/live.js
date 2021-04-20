Date.prototype.sumDate = function (date) {
    return (this.getTime() - date.getTime()) / 1000;
};
this.trains = [];
window.onload = () => GetData();
setInterval(GetData, 10 * 1000);
setInterval(() => {
    var board = document.getElementById("departure-board").children[1];
    board.innerHTML = "<tr><th></th><th>출발시간</th><th>도착역</th><th>열차종류</th><th>열차번호</th><th>타는곳</th><th>지연</th></tr>";
    var count = 0;
    for (var i = 0; i < trains.length; i++) {
        if (count >= 10) return;
        var train = trains[i];
        if (train.type == "skip") continue;
        if (train.type == "dest") continue;
        var isKTX = train.trn_kind == "KTX" || train.trn_kind == "KTX-산천" || train.trn_kind == "KTX_산천";
        var date_s = train.dep_ts.substr(0, 5);
        var date = Time(train.dep_ts);
        if (date < new Date()) continue;
        var minute = date.sumDate(new Date()) / 60;

        var html = "";
        html += `<tr class="${isKTX ? "ktx" : "normal"}">`;
        html += `<td>${minute <= 15 ? "●" : ""}</td>`;
        html += `<td>${date_s}</td>`;
        html += `<td>${train.dep_stn_nm}</td>`;
        html += `<td>${train.trn_kind}</td>`;
        html += `<td>${train.trn_no}</td>`;
        html += `<td></td>`;
        html += `<td>${Math.floor(train.late)}분</td>`;
        html += "</tr>";
        board.innerHTML += html;
        count++;
    }
}, 1000);
setInterval(() => {
    var board = document.getElementById("arrival-board").children[1];
    board.innerHTML = "<tr><th></th><th>도착시간</th><th>출발역</th><th>열차종류</th><th>열차번호</th><th>내리는곳</th><th>지연</th></tr>";
    var count = 0;
    for (var i = 0; i < trains.length; i++) {
        if (count >= 10) return;
        var train = trains[i];
        if (train.type == "skip") continue;
        if (train.type == "dept") continue;
        var isKTX = train.trn_kind == "KTX" || train.trn_kind == "KTX-산천" || train.trn_kind == "KTX_산천";
        var date_s = train.arv_ts.substr(0, 5);
        var date = Time(train.arv_ts);
        if (date < new Date()) continue;
        console.log(date.getHours(), new Date().getHours());
        var minute = date.sumDate(new Date()) / 60;

        var html = "";
        html += `<tr class="${isKTX ? "ktx" : "normal"}">`;
        html += `<td>${minute <= 15 ? "●" : ""}</td>`;
        html += `<td>${date_s}</td>`;
        html += `<td>${train.arv_stn_nm}</td>`;
        html += `<td>${train.trn_kind}</td>`;
        html += `<td>${train.trn_no}</td>`;
        html += `<td></td>`;
        html += `<td>${Math.floor(train.late)}분</td>`;
        html += "</tr>";
        board.innerHTML += html;
        count++;
    }
}, 1000);
setInterval(() => {
    for (var hour of document.getElementsByClassName("hour")) {
        hour.innerText = NumberPadding(new Date().getHours(), 2);
    }
    for (var min of document.getElementsByClassName("min")) {
        min.innerText = NumberPadding(new Date().getMinutes(), 2);
    }
}, 100);

function GetData() {
    const URLSearch = new URLSearchParams(location.search);
    const host = document.getElementById("host").value;
    axios({
        method: 'GET',
        url: `http://${host}/GetMetroArriveInfo?name=${URLSearch.get("name")}`
    })
        .then(response => {
            this.trains = response.data.trains;
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}
function Time(str) {
    var date = new Date();
    var arr = str.split(':');
    date.setHours(arr[0]);
    date.setMinutes(arr[1]);
    date.setSeconds(arr[2]);
    return date;
}
function NumberPadding(n, width) {
    n = n.toString();
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}