const bcruypt = require('bcrypt');

async function run(){
    let password = "datarshaunak" ;
    const salt = await bcruypt.genSalt(10);
    console.log(salt);
    password = await bcruypt.hash(password,salt);
    console.log(password);
}

run();