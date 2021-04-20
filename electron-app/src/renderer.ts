import { ipcRenderer, remote } from 'electron';

window.onload = () => {
    (() => {
        let form = document.getElementById("form");
        if (form == null) return;
        form.onsubmit = (ev: any) => {
            ev.preventDefault();
            let name = document.getElementsByName("name")[0];
            let value = (name as HTMLInputElement).value;
            ipcRenderer.send('changeUrl', btoa(`/live.html?name=${encodeURI(value)}`));
        };
    })();
    (() => {
        let host = document.getElementById("host");
        if (host == null) return;
        (host as HTMLInputElement).value = `localhost:${remote.getGlobal('port')}`;
    })();
}