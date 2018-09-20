# Projeto Irrigacafe

###### Trabalho de Conclusão de Curso - Bacharel em Sistemas de Informação 2018 - Uni-Facef

![GitHub Logo](/Image_README/logomarca2.png)

#### Objetivo
<p> O objetivo deste projeto é buscar um ganho significativo no controle e na eficácia dos processos, permitindo que os dados fiquem 
armazenados com segurança em sistemas de arquitetura em nuvem, garantindo assim rapidez nos resultados e automatização dos processos.</p>


##### A importância deste projeto se dá devido à dificuldade de se realizar as leituras dos tensiômetros e a coleta dos dados para garantir melhor controle, acurácia e acompanhamento destes dados por um sistema prático.

<p> Neste repositório encontra-se os documentos utilizados para realização do projeto:
 <p> 1. Levantamento de Requisitos</p>
 <p> 2. Prototipação de Telas</p>
 <p> 3. Código-fonte do Sistema</p>
 <p> 4. Modelo de Negócios</p>

## Fluxograma do Processo 

O Fluxograma tem por finalidade a representativa de todo o processo que envolve o sistema Irrigacafé desde a irrigação dos talhões até os dados apresentados aos usuários juntamente com as três etapas propostas:
- Automação do Tensiômetro
- Sistema Web Dashboard
- Sistema Mobile Open Source.


![GitHub Diagrama](/Image_README/Diagrama-de-Fluxo.png)

## Tensiômetro Automatizado 
<p> Foi realizado o protótipo do tensiômetro com sistemas embarcados, utilizando sensores de temperatura e umidade e sensor de pressão para
coleta dos dados e envio dos mesmos para o servidor em nuvem CloudMQTT.</p>

## Sistema Web - Dashboard
<p>A aplicação desenvolvida mostrar os gráficos das leituras realizadas pelo tensiômetro em comunicação com a CloudMQTT. 
Além de mostrar os dados de temperatura e umidade coletados do sensor DHT11 e mostrados no dashboard.
O sistema ainda conta com o gerenciamento de tarefas com intuito na organização das tarefas que devem ser executadas na lavoura ou no campo</p>
Este projeto foi gerado [Angular CLI] (https://github.com/angular/angular-cli) version 6.0.7.
