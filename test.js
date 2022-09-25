const Client = require("./src/Client");
async function main(){
  const to = "en";
  const from = "ja";
  const text = "こんにちは";

  const translated = await Client.translate(from,to,text)

  console.log(`${text}=>${translated}`)
}

main()