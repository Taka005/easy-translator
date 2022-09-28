const Client = require("./src/Client");
async function main(){
  const to = "en";
  const from = "ja";
  const text = "こんにちは。おはようございます。";

  const translated = await Client.translate(from,to,text)

  console.log(`${text}=>${translated}`)
}

main()