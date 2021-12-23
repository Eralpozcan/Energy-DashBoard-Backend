var pg = require('pg');

const conString = process.env.POSTGRESHOST;
const client = new pg.Client(conString);


client.connect(function(err){
    if(err) {
        return console.error('Could not connect to postgres', err);
    }
})

module.exports = client