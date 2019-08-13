

function load(){
    var welcomeText="Hello " + getCookie("username")+",";
    var activeTask=loadTasks();
    if(activeTask!=""){
        welcomeText=welcomeText+"<br><br> You Said You Should Be "+activeTask +" Right Now.";
    }
    document.getElementById("welcomeText").innerHTML=welcomeText;
}

function loadTasks(){

    var count=parseInt(getCookie("count"));
    var rtn="";
    for(var i=0;i<count;i++){
        var img='blank sign.jpg';

        var startTime=getCookie(i+".startTime");
        var endTime=getCookie(i+".endTime");

        if(startTime==""){return;}

        var timeRange=startTime+" - " + endTime;
        var taskName=getCookie(i+".taskName");

        var cardTheme="";
        if(checkIsTaskTime){
            rtn = taskName;
            cardTheme="activeCard"
        }

        var type=getCookie(i+".type");
        if(type=="work"){
            img="work.jpg"
        }else if(type=="fun"){
            img="fun.jpg"
        }else if(type=="hobby"){
            img="hobby.jpg"
        }

        var content="<div class='col-md-4 col-xs-4 '>"+ 
        "<div class='card "+ cardTheme + "'>"+
                "<img class='card-img-top' src='" + img + "' alt='Card image' style='width:100%'>"+
                "<div class='card-body'>"+
                "<h4 class='card-title'>" + timeRange + "</h4>"+
                "<p class='card-text'>" + taskName + "</p>"+
                "<a href=''><img src='delete.png' onclick='deleteCookie(" + i + ")' align='right'></a>"+
                "</div>"+
        "</div>"+
        "</div>"
        document.getElementById("taskList").innerHTML+=content;
        cardTheme="";
    }
    var end="<div class='col-md-4 col-xs-4 '>"+ 
        "<div class='card' data-toggle='modal' data-target='#inputModal'>"+
                "<img class='card-img-top' src='addMore.jpg' alt='Card image' style='width:100%'>"+
                "<div class='card-body'>"+
                "<h2 class='card-title'>Add New Tasks</h2>"+
                "</div>"+
        "</div>"+
        "</div>"
        document.getElementById("taskList").innerHTML+=end;

    return rtn;
}

function checkIsTaskTime( startTime,  endTime){
    var rightNow=new Date();

    if(startTime.split(":")[0]<rightNow.getHours() && endTime.split(":"[0]>rightNow.getHours())){
        if(startTime.split(":")[1]<rightNow.getMinutes() && endTime.split(":"[1]>rightNow.getMinutes())){
            return true;
        }    
    }
    return false;
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

  function saveCookie(){
    var startTime=document.getElementById("start_time").value;
    var endTime=document.getElementById("end_time").value;
    document.getElementById("time").innerHTML=startTime.split(":")[0];

    var taskName=document.getElementById("task").value;
    var type;

    if(document.getElementById("r1").checked){
        type="Work";
    } else if(document.getElementById("r2").checked){
        type="Entertainment";
    } else if(document.getElementById("r3").checked){
        type="Hobby";
    }
    
    var count=parseInt(getCookie("count"));
    if(getCookie("count")=="") count=0;
    saveData("count", count + 1)
    saveData(count+".startTime",startTime,365*10);
    saveData(count+".endTime",endTime,365*10);
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

  function deleteCookie(count){
    saveData(count+".startTime",startTime,365*10);
    saveData(count+".endTime",endTime,365*10);
    saveData(count+".taskName",taskName,365*10);
    saveData(count+".type",type,365*10);
  }