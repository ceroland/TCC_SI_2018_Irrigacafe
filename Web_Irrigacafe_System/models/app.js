const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const core_use = require('cors');
const pg = require('pg');
// const app = require('../models/app.js');

var router = express.Router();

//require('./models/db');

//const index = require('./routes/index');
//const users = require('./routes/users');

const app = express();

app.use(core_use());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = {
  user: 'postgres', //usuario
  database: 'IRRIGACAFE', //banco de dados
  password: '123', //PASSWORD
  port: 5432, //porta
  max: 10, // numero maximo de conexao
};

const pool = new pg.Pool(config);

const JSON = require('circular-json');

//--------------------------------------------DADOS MQTT -------------------------------------------------//
// vai buscar na tabela os dados inseridos apenas do topico do tensiometro
app.get('/tensiometro', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
      return console.error('error fetching client from pool', err);
      }
      client.query('SELECT id_tensiometro, topic, message, date, clientID  FROM tb_tensiometro order by id_tensiometro', function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      console.log(result.rows);
      res.json(result.rows);
      });
    });
  });

// vai buscar na tabela os dados inseridos apenas do topico da temperatura e umidade
app.get('/metereologia', function (req, res) {

      pool.connect(function(err, client, done) {
        if(err) {
        return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM tb_tensiometro where topic <> \'tensiometro\' order by date DESC limit 2' , function(err, result) {
        done();

        if(err) {
          return console.error('error running query', err);
        }
        res.setHeader('Access-Control-Allow-Origin','*');
        console.log(result.rows);
        res.json(result.rows);
        });
      });
    });



//------------------------------------------- TAREFAS -----------------------------------------------//
// rota GET para buscar as tarefas no banco de dados
app.get('/tarefas', function (req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM tb_tarefas order by DATE DESC', function(err, result) {
    done();

    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(result.rows);
    res.json(result.rows);
    });
  });
});

//rota para achar uma tarefa
app.get('/tarefas/:id_tarefa', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
      return console.error('error fetching client from pool', err);
      }
      client.query('SELECT * FROM tb_tarefas where id_tarefa = ' + req.params.id_tarefa, function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      console.log(result.rows);
      res.json(result.rows);
      });
    });
  });

// rota com protocolo POST para inserção no banco de dados
app.post('/newTarefa', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('insert into tb_tarefas (DATE, DESC_TAREFA, FINALIZADA, fg_ativo) values (\''+ req.body.tarefa.data +'\', \''+ req.body.tarefa.desc_tarefa +'\', false, 1)', function(err, result) {
        done();
        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); // servidor retorna a consulta em formato json

      });
    });
  });

// rota PUT para alterar uma tarefa no banco de dados
  app.put('/updateTarefa/:id_tarefa', function (req, res) {

      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
        client.query('update tb_tarefas set date = \''+ req.body.tarefa.data + '\', \'' + req.body.tarefa.desc_tarefa +
                'where id_tarefa = ' + req.body.tarefa.id_tarefa , function(err, result) {
          //call `done()` to release the client back to the pool
          done();

          if(err) {
            return console.error('error running query', err);
          }
          res.setHeader('Access-Control-Allow-Origin','*');
          res.json(result); // servidor retorna a consulta em formato json
        });
      });
    });

// rota PUT para alterar uma status finalizada no banco de dados
    app.put('/finalizaTarefa/:id_tarefa', function (req, res) {

        pool.connect(function(err, client, done) {
          if(err) {
            return console.error('error fetching client from pool', err);
          }
          client.query('update tb_tarefas set finalizada = true  where id_tarefa = ' + req.body.tarefa.id_tarefa , function(err, result) {
            done();

            if(err) {
              return console.error('error running query', err);
            }
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json(result); // servidor retorna a consulta em formato json
          });
        });
      });


// rota DELETE para excluir uma tarefa no banco de dados
app.delete('/delTarefa/:id_tarefa', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('delete from tb_tarefas where id_tarefa = ' + req.params.id_tarefa, function(err, result) {
        done();

        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows); // servidor retorna a consulta em formato json
      });
    });
});

//-------------------------------------------------- USUARIOS ----------------------------------------------------//
// rota GET para seleção no banco de dados dos usuarios
app.get('/users', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
      return console.error('error fetching client from pool', err);
      }
      client.query('SELECT * FROM tb_users order by id_user', function(err, result) {
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.setHeader('Access-Control-Allow-Origin','*');
      console.log(result.rows);
      res.json(result.rows);
      });
    });
  });

// rota com protocolo Post para autenticação do usuario
app.post('/autenticaLogin', function (req, res) {

  pool.connect(function(err, client, done) {
    if(err) {
    return console.error('error fetching client from pool', err);
    }
    client.query('SELECT COUNT(*) FROM tb_users WHERE nm_user = \'' + req.body.usuario.nm_user + '\' and password = \'' + req.body.usuario.password + '\'', function(err, result) {
    done();

    if(err) {
      return console.error('error running query', err);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(result.rows);
    res.json(result.rows);
    });
  });
});

// rota para inserção do usuario no banco de dados
app.post('/newUser', function (req, res) {

    pool.connect(function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }

      client.query('INSERT INTO tb_users (nm_user, lastname, e_mail, password, phone, fg_ativo) VALUES ( \'' + req.body.usuario.nome + '\', \'' + req.body.usuario.lastname + '\', \'' + req.body.usuario.e_mail + '\', \'' + req.body.usuario.password + '\', \'' + req.body.usuario.phone + '\', 1)', function(err, result) {

        done();
        if(err) {
          return console.error('error running query', err);
        }

        res.setHeader('Access-Control-Allow-Origin','*');
        res.json(result.rows);
      });
    });
});



app.listen(8080, () => {
  console.log('api started in port 8080');
});
