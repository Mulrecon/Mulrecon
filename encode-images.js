var fs = require('fs');

// function to encode file data to base64 encoded string
function base64Encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

const readFolder = './stacks/';
const writeFolder = './stacks-base64/';

fs.readdirSync(readFolder).forEach((file) => {
  fs.writeFileSync(`${writeFolder}/${file}`, `data:image/png;base64,${base64Encode(`${readFolder}/${file}`)}`);
});