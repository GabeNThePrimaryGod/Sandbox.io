class SandboxContainer
{
    constructor()
    {
        this.sandboxes = new Map();
    }

    add(sandbox)
    {
        this.sandboxes.set(sandbox.uniqueID, sandbox);
        return this;
    }

    get(uniqueID)
    {
        return this.sandboxes.get(uniqueID);
    }

    forEach(callback)
    {
        this.sandboxes.forEach((sandbox, uniqueID) => callback(sandbox, uniqueID));
    }
}

module.exports = SandboxContainer;