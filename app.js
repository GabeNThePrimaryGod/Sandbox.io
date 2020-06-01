console.clear();
// Couleurs de console : https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
console.log("\x1b[31m%s\x1b[0m", "[--------------------------------]");

const path = require("path");
const socket = require("socket.io");
const express = require("express");
const http = require("http");

const SandboxLibrary = require("./server/lib");
const ModLoader = SandboxLibrary.constructors.ModLoader;
const UIDManager = SandboxLibrary.constructors.UIDManager;
const RoomLoader = SandboxLibrary.constructors.RoomLoader;
const RoomsManager = SandboxLibrary.constructors.RoomsManager;
const HTTPManager = SandboxLibrary.constructors.HTTPManager;
const SandboxLoader = SandboxLibrary.constructors.SandboxLoader;

//const { ModInterfaceContainer } = require("./server/lib/ModInterface");
const ModInterfaceContainer = SandboxLibrary.constructors.ModInterfaceContainer;

const app = express();
const server = http.createServer(app);

// Déplacer tout ça dans un endroit adapté : config.js ou init.js
SandboxLibrary.env.set("httpServer", server);
SandboxLibrary.env.set("app", app);
SandboxLibrary.env.set("socketIO", socket(server));
SandboxLibrary.env.set("sandboxPath", path.join(__dirname, "server/Sandboxes/"));
SandboxLibrary.env.set("modPath", path.join(__dirname, "server/Mods/"));
SandboxLibrary.env.set("RoomsManager", new RoomsManager());
SandboxLibrary.env.set("UIDManager", new UIDManager());
SandboxLibrary.env.set("debugLevel", "note");
SandboxLibrary.env.set("ModLoader", new ModLoader());
SandboxLibrary.env.set("RoomLoader", new RoomLoader());
SandboxLibrary.env.set("HTTPManager", new HTTPManager());
SandboxLibrary.env.set("SandboxLoader", new SandboxLoader());
SandboxLibrary.env.set("ModInterfaceContainer", new ModInterfaceContainer(true));

// permet de generer un acces au variables d'un POST dans req.body 
app.use(express.urlencoded({ extended: false }));
app.set('view-engine', 'ejs');

app.use(express.static(path.join(__dirname, '/client')));


/* BEGINNING OF DEGUEULASSE CODE */
function basicIterator()
{
    const next = this.get("lastValue") + 1;

    this.persist("lastValue", next);

    return (`00${next}`).slice(-3);
};

function checkValidity(UID)
{
    // Chaîne de caractère qui représente un nombre allant de 000 à 999
    return /^[0-9]{3}$/.test(UID);
}

// Création de générateurs d'UID : 1 pour les sandboxes, 1 pour les mods
SandboxLibrary.env.get("UIDManager")
.create("sandbox", basicIterator, checkValidity, { lastValue: 0 })
.create("mod", basicIterator, checkValidity, { lastValue: 0 });
/* END OF DEGUEULASSE CODE */

//const room = SandboxLibrary.env.get("sandboxLoader").instanciateFromFolder("001");

//const roomsManager = new RoomsManager({httpServer: server, express: express, app:app});

b = SandboxLibrary.env.get("ModInterfaceContainer");

/*

console.log(b.getSyncModconfig("001"));
b.getModconfig("001").then(modConfig => console.log(modConfig));
setTimeout(() => console.log(b.getSyncModconfig("001")), 1000);
*/
let a = null;

b.getModInterface("001").then(m => a = m.instanciateSync())
.catch(console.log);


const c = new ModInterfaceContainer();
c.load([ "001", "002", "008" ])
.then(() => console.log("youpi"))
.catch((err) => console.log("eh merde : " + err));


/*var modlo = SandboxLibrary.env.get("ModLoader");

(async function()
{
    const mode = await modlo.getMod("002");

    console.log(mode);
})();*/


server.listen(80);