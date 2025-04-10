const { app, BrowserWindow, Menu, ipcMain } = require('electron')


function createWindow () {
  const win = new BrowserWindow({
    
    
    fullscreen:true,

 
    
    
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools:true,
    },

  })

  win.loadFile('main.html')
 
}

function createMenu() {
  const template = [
    {
      label: 'file',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        },
        {
          label: 'Restart',
          accelerator: 'CmdOrCtrl+R',
          click: () => {app.quit(); app.relaunch()}
        }
      ]
    }
  
    
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()
  createMenu()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 
