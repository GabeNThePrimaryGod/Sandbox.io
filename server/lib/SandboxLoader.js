const path = require("path");
const fs = require("fs");
const LibraryComponent = require("./LibraryComponent");

class SandboxLoader extends LibraryComponent
{
    constructor()
    {
        super()
    }

    getAbsolutePath(sandboxFolder)
    {
        return path.join(this.env.get("sandboxPath"), sandboxFolder);
    }

    instanciateFromFolder(sandboxFolder)
    {
        const absolutePath = this.getAbsolutePath(sandboxFolder);

        return new Promise((resolve, reject) =>
        {
            this.debug("note", `Parsing ${absolutePath} sandbox directory...`)
            const sandboxConfigPath = path.join(absolutePath, "sandboxconfig.json");

            /*
                Toutes les opérations I/O doivent être asynchrones pour des raisons de performances.
                Il faut donc utiliser des fonctions asynchrones chaque fois que possible.
            */
            fs.readFile(sandboxConfigPath, "utf-8", (err, data) =>
            {
                if (err) reject(err);
                else
                {
                    const sandboxConfig = JSON.parse(data);

                    if (this.env.get("UIDManager").get("sandbox").isValid(sandboxConfig.UID))
                    {
                        sandboxConfig.sandboxPath = absolutePath;

                        resolve(new this.constructors.Room(sandboxConfig));
                    }
                    else reject(new Error("Invalid Sandbox ID"));
                }
            });
        });
    }
}

module.exports = SandboxLoader;