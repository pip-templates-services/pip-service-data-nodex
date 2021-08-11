let EntitiesProcess = require('../obj/src/containers/EntitiesProcess').EntitiesProcess;

try {
    let proc = new EntitiesProcess();
    proc._configPath = "./config/config.yml";
    proc.run(process.argv);
} catch (ex) {
    console.error(ex);
}
