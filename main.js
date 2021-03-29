const {
    app,
    BrowserWindow,
    screen,
    Menu,
    Tray,
    } = require('electron');
const path = require('path');
const debug = process.argv.includes("debug");

const myApp = {
    mainWindow: null,
    contextMenu: false,
    pickedWindow: null,
    menu: null,
    tray: null, //musi byc globalne bo inaczej garbage collector sprawia ze nie mia ikonki w trayu

    toggleWindow(show) {
        if (!show) {
            this.mainWindow.hide();
        } else {
            this.mainWindow.show();
        }
    },

    createMainWindow() {
        const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize;

        const windowSize = {
            width: 1600,
            height: 900
        }

        Menu.setApplicationMenu(false)

        this.mainWindow = new BrowserWindow({
            icon: path.join(__dirname, '/images/icon.png'),
            width: windowSize.width,
            height: windowSize.height,
            x: screenW / 2 - windowSize.width / 2,
            y: screenH / 2 - windowSize.height / 2,
            maximizable: true,
            frame: true,
            tabbingIdentifier: "Timer",
            webPreferences: {
                sandbox: false, //TODO? check this
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
            }
        });

        this.mainWindow.loadFile('index.html');

        const imgPath = path.join(__dirname, '/images/icon.png');

        this.tray = new Tray(imgPath);
        this.tray.setToolTip('kolory');
        this.tray.on('click', () => {
            this.toggleWindow(true);
        });


        this.mainWindow.setMenuBarVisibility(false); //ukrywam gorne menu

        if (debug) {
            this.mainWindow.webContents.openDevTools()
        }
    },

    init() {
        // app.disableHardwareAcceleration();
        // app.commandLine.appendSwitch("disable-software-rasterizer");

        app.on('ready', () => {
            this.createMainWindow();
        });

        app.on('window-all-closed', function() {
            if (process.platform !== 'darwin') app.quit()
        });

        app.on('activate', function() {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow();
            }
        });
    }
};

myApp.init();
