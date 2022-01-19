//i was download ffmpeg and use in my local storage perfectly but i try to upload this (ffmpeg.exe) it tells file size is too big so this files is only i leave to upload
var app = require('electron').app

const ipc = require('electron').ipcMain 

const os = require ('os')

var {dialog} = require('electron')
var BrowserWindow = require('electron').BrowserWindow
app.disableHardwareAcceleration()
var mainWindow = null

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    mainWindow.loadURL("file://"+ __dirname+"/main.html")
    mainWindow.on('closed', function(){
        mainWindow = null;
    })
})

ipc.on('open-file-dialog-for-file',function(event){
    console.log("Button Pressed");
   // console.log(event);
    if(os.platform() === 'linux' || os.platform() === 'win32'){
        dialog.showOpenDialog(null,{
            properties:['openFile']
        }).then((result) => {
            console.log(result.filePaths)
            event.sender.send('selected-file',result.filePaths[0])
        }).catch((err) => {
            console.log(err)
        })
    }else{
        dialog.showOpenDialog(null,{
            properties:['openFile','openDirectory']
        }).then((result) => {
            console.log(result.filePaths)
            event.sender.send('selected-file',result.filePaths[0])
        }).catch((err) => {
            console.log(err)
        })
    }
})
