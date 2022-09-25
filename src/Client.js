const Nightmare = require("nightmare");

async function translator(from,to,text){
  try{
    const nightmare = new Nightmare({
      ignoreDownloads: true,
      waitTimeout: 60000,
    });
    
    const url = `https://translate.google.com/?sl=${from}&text=${text}&tl=${to}&op=translate`;
    const translated = await nightmare
      .goto(url)
      .evaluate(() =>{
         const button = document.querySelector("form[action='https://consent.google.com/s'] button")
        if(button){
          button.click();
        }
      })
      .wait("span[jsname=jqKxS]")
      .wait(500)
      .evaluate(() =>(document.querySelector("span[jsname=jqKxS]")).innerText)
      .end();
    
    if(!translated){
      throw new Error("翻訳できませんでした");
    }
    
    return translated.toString();
  }catch(error){
    throw new Error(error);
  }
}

async function translate(from,to,text){
  if(text.length > 5000){
    throw new Error("最大翻訳数は5000文字以下です");
  }
  const translated = await translator(from,to, encodeURIComponent(text))
  return translated;
}

module.exports = {
  translate
}