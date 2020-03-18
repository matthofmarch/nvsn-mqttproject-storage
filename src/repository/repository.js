const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://192.168.99.100:27017";
const dbName = "mqtt"

function addValues(sensor, measurement) {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        console.log("Database created!");
        const db = client.db(dbName);
      
        const sensors = db.collection('measurements');
        
        sensors.insert({
            value: measurement.value,
            date: measurement.date,
            sensor: sensor.name,
            unit: measurement.unit
            },
            (err, dbArtikel) => {
                if(err){
                    throw err;
                }
        
                console.log("Row inserted");
            });
      
        client.close();
      });
}

function getAll(sensor, measurement) {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;

        const db = client.db(dbName);
      
        const sensors = db.collection('measurements');

        sensors.find({}).toArray((err, result) => {
            if (err) throw err;
      
            console.log(result);
          });
      
        client.close();
      });
}