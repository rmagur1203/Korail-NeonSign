import { reqUri } from './Constants.js';
import fetch from 'node-fetch'
import FormEncode from './FormEncode.js';

export default class Base {
    Task?: Promise<any>;

    request(data: any) {
        this.Task = new Promise((resolve, reject) => {
            fetch(reqUri, {
                "headers": {
                    "x-requested-with": "XMLHttpRequest",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
                    "referer": "https://nxlogis.kr/",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                "body": FormEncode(data),
                "method": "POST"
            }).then(res => res.json())
                .catch(err => reject(err))
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    }

    async GetResult() {
        return await this.Task;
    }
}