const bcrypt = require('bcrypt');
// const Date = require('date');

(async () => {password="sakpal123"
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
})()
// const date=new Date()
const date=Date.now()
// ////////////////////console.log(hashedPassword)
//console.log(date)


// zeeshan -s007