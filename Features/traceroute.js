
const bodyParser = require("body-parser");
const exec = require('child_process').exec;
const sys = require('util')
const request = require('request');

/*this function is added to Array prototype to remove element of specific index ex: myArray.remove(index)   or a range of element from to*/
Array.prototype.remove = function(from, to) {

    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
  
/*to filter non valid ip addresses from array*/
function filter(res){
    for(var i=0;i< res.length;i++){
      if((res[i].match(/UNKNOWN/))||(res[i].match(/unknown/))||(res[i].match(/\*/))||(res[i]==="")){
  
         res.remove(i);
         i--;
      }
    }
}
  
function createObj(countryName,lat,long) {
  
    
        this.countryName=countryName;
        this.loc=[lat, long];
  }
  






module.exports = function(req, result){
        console.log("a")
        
        
        let searchUrl = req.body.searchUrl; 
        
        console.log(searchUrl)
        var com="traceroute "+searchUrl+" | tail -n+2 | awk '{ print  $2 }'"
        console.log("geting Ips of "+searchUrl+"  ...");
        
        //execute a child process
        let child = exec(com, function (error, stdout, stderr) {
        if (error) {
            console.log('exec error: ' + error);
        }
        else {
            console.log("filtring");
            
            //array of ip addresses
            var res=stdout.split('\n')
            filter(res)
            // the final list which contains json objects
            var LIST=[]
    
            COUNTER=0
            console.log(res.length);
            for (i=0 ;i < res.length; i++) {
            console.log( i+" : geting information about :\t "+res[i]);
    
            var getIpInfo="http://freegeoip.net/json/"+res[i]
            //http request to get longitude latitude and country name
            request(getIpInfo, function (error, response, body) {
                COUNTER++;
    
                if(body.indexOf("404 page not found")===-1){
    
                var json = JSON.parse(body);
                if((json.latitude!==0)&&(json.longitude!==0)){
                    //var obj = new createObj(json.country_name,json.latitude,json.longitude)
                    var obj ={
                        country_name: json.country_name,
                        latLng: [json.latitude,json.longitude]
                    }
                    LIST.push(obj)
    
                    if(COUNTER==res.length){
                    //console.log(LIST);
                        result.send({v:true, data:LIST});
                    
                    }
                }
                }
                else {
                //  console.log(error+"\t" +response);
                if(COUNTER==res.length){
                        //TODO : here you hav the access to the final list which contains all result
                        // you can do forEach and add element only to test the app after we structer the hole app in API
                        // as you can see all the treatment is in post method  "post of url in th searchBar"
    
    
                    //console.log(LIST);
                    result.send({v:true, data:LIST});
                    
                }
                }
            });
            }
        }
        });
   
    }
