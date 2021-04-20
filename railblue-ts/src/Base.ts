import fetch from 'node-fetch'

export default class Base {
    Task?: Promise<any>;

    request(url: string) {
        console.log(url);
        this.Task = new Promise((resolve, reject) => {
            fetch(url, {
                "headers": {
                    "x-requested-with": "XMLHttpRequest"
                },
                "method": "GET"
            }).then(res => res.text())
                .catch(err => reject(err))
                .then(body => resolve(body))
                .catch(err => reject(err));
        });
    }

    async GetResult() {
        return await this.Task;
    }
}