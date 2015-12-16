const libContext = require.context('../lib/', true, /\.js$/);
const testContext = require.context('./lib/', true, /\.js$/);

libContext.keys().forEach(libContext);
testContext.keys().forEach(testContext);
