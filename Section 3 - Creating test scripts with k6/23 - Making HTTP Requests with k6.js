import http from 'k6/http';
import { sleep } from 'k6';


export default function () {
    const res = http.get('https://test.k6.io');
    console.log(res.status);
    sleep(1);
}


