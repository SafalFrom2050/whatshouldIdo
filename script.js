 
function getTime(){
    var startTime=document.getElementById("start_time").value;
    var endTime=document.getElementById("end_time").value;

    var username=document.getElementById("name").value;
    var taskName=document.getElementById("task").value;
    var type;

    if(document.getElementById("r1").checked){
        type="work";
    } else if(document.getElementById("r2").checked){
        type="fun";
    } else if(document.getElementById("r3").checked){
        type="hobby";
    }
    
    var count=parseInt(getCookie("count"));
    if(getCookie("count")=="") count=0;
    saveData("count", count + 1)
    saveData(count+".startTime",startTime,365*10);
    saveData(count+".endTime",endTime,365*10);
    saveData("username",username,365*10);
    saveData(count+".taskName",taskName,365*10);
    saveData(count+".type",type,365*10);
} 

function saveData(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + "; path=/";
  }

  function removeData(name){
    if(getCookie(name)!=""){
        saveData(name,"",0);
    }
  }

  function getCookie(n) {
    var name = n + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function goToHomePageIfCookiesAreStored(){
    if(getCookie("username")!="" && !window.location.href.endsWith("#")){
        window.location.replace("/home");
    }
  }

  function copyActivity(id){
    var startTime, endTime, type, taskName;
    if(id==1){
      startTime="05:00";
      endTime="13:00";
      type="hobby";
      taskName="Developing Android App (Coding + Designing + Production)"
    }else if(id==2){
      startTime="17:00";
      endTime="23:00";
      type="fun";
      taskName="Searching For Demons On Internet"
    }else if (id==3){
      startTime="10:00";
      endTime="17:00";
      type="work";
      taskName="Teaching Defence In Dark Arts In Hogwards: School Of Magic And Witchcraft"
    }

    var count=parseInt(getCookie("count"));
    if(getCookie("count")=="") count=0;
    saveData("count", count + 1)
    saveData(count+".startTime",startTime,365*10);
    saveData(count+".endTime",endTime,365*10);
    saveData(count+".taskName",taskName,365*10);
    saveData(count+".type",type,365*10);
  }