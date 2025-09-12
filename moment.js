const moment = require('moment');


function getCurrentDay(){
    return moment().format("YY/MM/DD H:mm:ss");
}




console.log(getCurrentDay());
