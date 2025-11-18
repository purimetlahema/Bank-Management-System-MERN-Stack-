function generateAccountNumber(){
  let num = ""
  for(let i = 0;i<12;i++){
    let d = Math.floor(Math.random()*10)
    if(i===0 && d ===0) i--
    else num = num+d
  }
  return num;
}

module.exports = generateAccountNumber