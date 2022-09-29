const fetch = require("node-fetch");

async function translator(from,to,text){
  try{
    const translate = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&dj=1&q=${text}`)
      .then(res => res.json())
      .catch(error =>{
        throw new Error(error)
      });

    const translated = translate.sentences.map((sentence)=>{
      return sentence.trans
    });
    return translated.join("");
  }catch(error){
    throw new Error(error);
  }
}

async function translate(from,to,text){
  if(text.length > 5000){
    throw new Error("最大翻訳数は5000文字以下です(The maximum number of translations is 5000 characters or less)");
  }
  const translated = await translator(from,to, encodeURIComponent(text))
  return translated;
}

module.exports = {
  translate
}