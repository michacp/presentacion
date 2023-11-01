const moment=require('moment');

const helpers={};
helpers.dateList=(date)=>{
    moment.locale('es')
return moment(date).format('L')
}
module.exports=helpers