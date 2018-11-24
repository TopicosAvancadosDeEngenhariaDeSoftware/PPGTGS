

var config = require('../config/config');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = ''+config.config["acess-jwt"];


module.exports = class cryptoDao{
    constructor(){
        
    }
    encrypt(text){
        var cipher = crypto.createCipher(algorithm,password)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    }
       
    decrypt(text){
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    compare(text, hash){
        if(text == null || text == NaN || text == undefined) return false;
        return this.decrypt(hash) == text;
    }

}