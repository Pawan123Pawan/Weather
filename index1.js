const http = require('http');
const fs = require('fs');

const openFile = fs.readFileSync("index.html", 'utf-8');

const replaceVal = (tempVal, orgVal) => {
    let temprature = tempVal.replace('{%tempval%}', (parseFloat((orgVal.main.temp)-273.15).toFixed(2)));
    temprature = temprature.replace('{%tempmin%}', (parseFloat((orgVal.main.temp_min)-273.15).toFixed(2)));
    temprature = temprature.replace('{%tempmax%}', (parseFloat((orgVal.main.temp_max)-273.15).toFixed(2)));
    temprature = temprature.replace('{%location%}', orgVal.name);
    temprature = temprature.replace('{%country%}', orgVal.sys.country);
    temprature = temprature.replace('{%tempstatus%}', orgVal.weather[0].main);
   
    return temprature;
};  

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        const request = require('request')
        request("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=225c3ba08e641a9f72fea81fd52ceb38")
            .on("data", (chunk) => {
                const objdata = JSON.parse(`${chunk}`);
                const arrdata = [objdata];
                // console.log(arrdata[0].main.temp);
                const realTimedata = arrdata.map((val) => replaceVal(openFile , val)).join(" ");
                res.write(realTimedata);
                // console.log(realTimedata) ;
            })
            .on('end', (err) => {
                if (err) { return console.log('Connection closed due errors', err) }
                console.log('end',)
                res.end();
            });

    }
});
server.listen(8000, '127.0.0.1')