const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const core_use = require('cors');
const router = express.Router();
const app = express();

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const mqtt = require('mqtt');

// variaveis para receber
const TopicTensiometro = 'tensiometro';
const TopicHumidity = 'umidade';
const TopicTemperature = 'temperatura';


const options = {
	host: 'mqtt://m12.cloudmqtt.com',
	port: 16028,
	protocolId: 'MQTT',
  protocolVersion: 4,
  clean:false,
  keepalive: 60,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
	username: 'islwnyaj',
  password: '7QztYeenqVoh'
};

var client  = mqtt.connect('mqtt://m12.cloudmqtt.com', options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect() {
    console.log("Connectado no MQTT");
    client.subscribe(TopicTensiometro,  mqtt_subscribe);
    client.subscribe(TopicHumidity,  mqtt_subscribe);
    client.subscribe(TopicTemperature,  mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log("Subscribe to " + TopicTensiometro);
    console.log("Subscribe to " + TopicHumidity);
    console.log("Subscribe to " + TopicTemperature);
    if (err) {console.log(err);}
}

function mqtt_reconnect(err) {
    console.log("Reconectando com MQTT");
    if (err) {console.log(err);}
	client  = mqtt.connect('mqtt://m12.cloudmqtt.com', options);
}

function mqtt_error(err){
    console.log("Error!");
	if (err) {console.log(err);}
}

function after_publish(){
	//do nothing
}

function mqtt_messsageReceived(topic, message, packet){
  // mostra no console os dados trazidos do mqtt
  console.log('Topico=' +  topic + '  Mensagem=' + message);

  //faz o insert no banco de dados
  insert_message(topic, message, packet);
}

//fecha a conexao
function mqtt_close(){
	console.log("Close MQTT");
}

////////////////////////////////////////////////////
//_________ CONEXAO POSTGRES ____________________//
const pg = require('pg');


// Cria conexao com o banco de dados
const config = {
  user: 'postgres', //usuario
  database: 'IRRIGACAFE', //banco de dados
  password: '123', //PASSWORD
  port: 5432, //porta
  max: 10, // numero maximo de conexao
};

const pool = new pg.Pool(config);

// Teste de conexao com o BD
//connection.connect(function(err) {
//	if (err) throw err;
	//console.log("BD Connectado!");
//});

//------------------ MQTT -------------------------------//
//insert
function insert_message(topic, message, packet, req, res) {
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    var clientID= "Irrigacafe";
    client.query('INSERT INTO tb_tensiometro (clientId, topic, message) VALUES ($1, $2, $3);', [clientID, topic, message], function (err, result){
      done()
      if (err) {
        console.log(err);
    }
    console.log("Inserção concluída com Sucesso!!!");
    });
  });
};




// seta url da api
app.listen(8090, () => {
  console.log('api started in port 8090');
});
