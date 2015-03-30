export default function(msg, json) {
    throw new Error('Yummies: ' + msg + ' @ ' + JSON.stringify(json));
}
