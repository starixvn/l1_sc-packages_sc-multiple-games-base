import Startup from "./startup";

const run = async () => {
    const startup = new Startup();
    startup.start();
};

run();
