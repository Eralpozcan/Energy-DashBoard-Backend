var pg = require('pg');

const conString = "POSTGREURL";
const client = new pg.Client(conString);


client.connect(function(err){
    if(err) {
        return console.error('Could not connect to postgres', err);
    }
})

module.exports = client