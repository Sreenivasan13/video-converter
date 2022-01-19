const ipc = require('electron').ipcRenderer
//i was download ffmpeg and use in my local storage perfectly but i try to upload this (ffmpeg.exe) it tells file size is too big so this files is only i leave to upload
// const ffmpeg = require('ffmpeg')
const button = document.getElementById("upload")

const randomString = require('random-string')
const process = require('child_process')
// try {
// 	const process = require('child_process');
// 	process.then(function (video) {
// 		console.log('The video is ready to be processed');
// 	}, function (err) {
// 		console.log('Error: ' + err);
// 	});
// } catch (e) {
// 	console.log(e.code);
// 	console.log(e.msg);
// }
var format = 'mp3'

const fs = require('fs')

const $ = require('jquery')
var dir = './media'
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}

$("#format").change(function(){
    format = $("#format option:selected").text()
})

button.addEventListener('click', function(event){
    ipc.send('open-file-dialog-for-file')
})

ipc.on('selected-file',function(event,paths){
    //console.log(event);
    console.log(paths);
    
    var randomid = randomString()
    $("#info").append(`
      <br/> <br/>
          <div id=${randomid} class="alert alert-success">
             ${paths} is converting so please wait
          </div>
    `)
    //execution of conversion using ffmpeg command
    process.exec(`ffmpeg -i "${paths}" media/${randomString()}_video.${format}`
    ,function(error,stdout,stderr){
        console.log(stdout);
         
        $(`#${randomid}`).detach()

        Notification.requestPermission().then(function(result){
            var myNotification = new Notification("Conversion Completed",{
                body:"Your File was Successfully Converted"
            })
        })
        if(error !== null){
            console.log(error);
        }
    })
})