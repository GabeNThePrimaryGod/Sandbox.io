// Ce fichier sera directement envoyé au client et pas interprété par le serveur
// ClientMod provient de sandbox.client.js

// Pas ouf mais marche, comme ça on contrôle bien le ClientMod passé (côté client)
export default (ClientMod) =>
{
    return class Mod001 extends ClientMod
    {
        constructor(config)
        {
            super(config);

            this.updateCount = 99;
            this.currentBackground = 1;
            this.canvas = document.getElementById("environmentCanvas");
            this.context = this.canvas.getContext("2d");

            this.init();
        }

        update()
        {

        }

        onReceiveData(event, data)
        {
            console.log(`[Env] : ${event}`, data);

            if (event === "set-background")
            {
                const sprite = this.loadedResources.get(data);

                if (sprite)
                {
                    console.log(`Changing background to ${data} : `, sprite);
                    this.context.drawImage(sprite, 0, 0);
                }
                else
                {
                    console.log(`Cannot set background ${data}`);
                }
            }
        }

        init()
        {
            this.sendData("event1", "data1");
            console.log("Mod001 instancié !");
        }
    }
}


// Mods natifs : NativeItemMod
// NativePlayerMod
// NativeEnvironmentMod
// NativeGameObjectMod


// Code côté client (fichier envoyé au client)
/*
const myMod1 = new ModClient();     // /!\ new Sandbox.Mod() et non pas Sandbox.Mod.Client()
// On passe le this = instance sandbox client
myMod1.onReceiveData(event, callback(data));
myMod1.sendData(event, data, ack);
*/