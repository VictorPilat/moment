const moment = require('moment');


function getDate(){
    return moment().format("Y/MM/DD H:mm:ss");
}




console.log(getDate());
