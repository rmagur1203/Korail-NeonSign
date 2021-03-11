const fs = require('fs');
const { DisplayDriveTrainList2, SearchTrainInfo } = require('./index.js');

(async () => {
    var trains = new Map();
    if (fs.existsSync('./trainSchedule.json')) {
        var str = await fs.readFileSync('./trainSchedule.json')
        trains = Object2Map(JSON.parse(str));
    }
    var nums = [716, 718, 720, 722, 724, 784];
    for (var a = 0; a < nums.length; a++) {
        var i = nums[a];
        console.log("start");
        if (include(trains, i)) {
            console.log(i);
            continue;
        }
        setTimeout(async (i) => {
            var r1 = new SearchTrainInfo(null, i, "20201220");
            var data = await r1.GetResult();
            if (data.result != 200) return;
            var stations = data.data.schedule.map(function (value, index, array) {
                return value.stn_nm;
            });
            if (i % 2 == 0)
                stations = stations.reverse();
            var station = stations.join("-");
            if (trains.get(station) == null)
                trains.set(station, []);
            trains.get(station).push(i);
            console.log(station + " => ", trains.get(station));
            console.log(JSON.stringify(Map2Object(trains), null, '\t'));
            await fs.writeFileSync(`./trainSchedule.json`, JSON.stringify(Map2Object(trains), null, '\t'));
        }, 1, i);
    }
    /*
    for (let [key, value] of trains) {
        await fs.writeFileSync(`./trainSchedule/${key}.json`, JSON.stringify(value, null, '\t'));
        console.log(key + ' => ' + value)
    }
    */
})();

function include(map, val) {
    return ([].concat(...map.values())).includes(val);
}

function last(arr) {
    return arr[arr.length - 1];
}

function Map2Object(map) {
    var obj = {};
    for (let [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}

function Object2Map(obj){
    var map = new Map();
    for (let v of Object.getOwnPropertyNames(obj)) {
        map.set(v, obj[v]);
    }
    return map;
}

/*
import fetch from 'node-fetch'
fetch("https://nxlogis.kr/getdata.php", {
    "headers": {
        "x-requested-with": "XMLHttpRequest",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "referer": "https://nxlogis.kr/?act=DisplayDriveTrainList2&q=&d=&h=&q2=",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    "body": "act=DisplayDriveTrainList2&q=&d=20201206&h=&q2=",
    "method": "POST"
})
.then(res => res.text())
.then(body => console.log(body));
*/