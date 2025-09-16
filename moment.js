const moment = require('moment');


function getDate(){
    return moment().format("Y/MM/DD H:mm:ss");
}

function getDay(){
    return moment().format("dddd");
}

console.log(getDate());

console.log(getDay());
