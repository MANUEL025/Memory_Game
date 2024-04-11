getDataStorage('users');
  function getDataStorage(obj){

let getData=localStorage.getItem(obj);
//console.log(getData);

let x=JSON.parse(getData);
//console.log(x['users'][0].username);
let url=location.href;
let getDataUri=url.substring(url.indexOf("?")+1,url.length).split("&");
let name=getDataUri[0].split("=");
let points=getDataUri[1].split("=");
document.getElementById("labelName").innerHTML="USERNAME: "+name[1];
document.getElementById("labelPoints").innerHTML="POINTS: "+points[1];
createTableUser();

}

function createTableUser(){
let getData=JSON.parse(localStorage.getItem('User'));
var contTable=document.getElementById('contTbody');
var newRow="";
let cont=0;
getData['User'].forEach(element => {    
  cont++;
  newRow+='<tr><td class="text-center">'+cont+'</td><td class="text-center">'+element.user+'</td><td class="text-center">'+element.points+'</td></tr>'
});    
contTable.innerHTML=newRow;
}
