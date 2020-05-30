const crypt = require('crypto')
const fs = require('fs')

const generateKey=()=>{
    const SecertKey = "SECRET_KEY="+crypt.randomBytes(128).toString('hex')
    const ACCESSTOKEN_SECRET = "ACCESSTOKEN_SECRET="+crypt.randomBytes(128).toString('hex')
    const REFRESH_TOKEN = "REFRESH_TOKEN="+crypt.randomBytes(128).toString('hex')
    let FirstPath = __dirname.replace('functions','.env')
    let secondPath = __dirname.replace('authentication','dataProvider')
    
    secondPath = secondPath.replace('functions','.env')
    
    if (!fs.existsSync(FirstPath)||(!fs.existsSync(secondPath))){
        fs.writeFileSync(FirstPath,SecertKey+'\n'+ACCESSTOKEN_SECRET+'\n'+REFRESH_TOKEN)
        fs.writeFileSync(secondPath,ACCESSTOKEN_SECRET+'\n'+REFRESH_TOKEN)
    }
}

module.exports = generateKey