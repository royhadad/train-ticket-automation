const exportFunc = require("./src");

console.log("started");
exportFunc().then((r) => {
    console.log("done");
});
