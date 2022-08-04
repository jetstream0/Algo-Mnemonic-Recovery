const algosdk = require('algosdk');
const fs = require('fs');

let address = "";
let faulty_word = "";

async function main() {
  let file = fs.readFileSync("words.txt", {encoding: "utf-8"});
  let words = file.split("\n");
  for (let i=0; i < words.length; i++) {
    let mnemonic = process.env.incorrect_mnemonic.replace(faulty_word, words[i]);
    let test;
    try {
      test = algosdk.mnemonicToSecretKey(mnemonic);
    } catch (e) {
      console.log(String(i+1)+"/"+String(words.length), words[i], "Fail");
      continue;
    }
    console.log(String(i+1)+"/"+String(words.length), words[i], test.addr);
    if (test.addr === address) {
      console.log("Found it! "+words[i]);
      break;
    }
  }
}

main();