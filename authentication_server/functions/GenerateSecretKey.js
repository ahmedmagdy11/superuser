const crypt = require('crypto')
const fs = require('fs')

const generateKey=()=>{
    const SecertKey = "SECRET_KEY="+crypt.randomBytes(128).toString('hex')
    if (!fs.existsSync(__dirname.replace('functions','.env'))){
        fs.writeFileSync(__dirname.replace('functions','.env'),SecertKey)
    }
}

module.exports = generateKey