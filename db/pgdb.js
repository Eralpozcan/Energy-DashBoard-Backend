var pg = require('pg');

const conString = "postgres://wiamsred:B9L7vvhdG6irWJXjwW_HS7C58AUNA0Ml@abul.db.elephantsql.com/wiamsred";
const client = new pg.Client(conString);


client.connect(function(err){
    if(err) {
        return console.error('Could not connect to postgres', err);
    }
})

module.exports = client