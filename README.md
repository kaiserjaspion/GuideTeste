# GuideTeste
Teste para empresa Guide TI 

O sistema utiliza DotNet core 2.2 para o backend e angular 6.1 para o front. Contem uma pagina com gerenciamento de autores e na home os requisitos do teste. O sistema tambem apresenta um Swagger para documentação dos endpoints da API corrente do projeto (localhost:<port>/Swagger).

O sistema de testes atual do Xunit não é compativel com DotNET Core 2.2 e portanto não quis fazer o downgrade para o 2.1 ( preferenciamente utilizados por conta da ferramente de desenvolvimento que utilizo na minha casa - VisualStudio 2017 , a qual tenho a chave e resharp) 

dentro do sistema utilizei o banco de dado interno do visual studio para facilitar o desenvolvimento portanto o migrations pode ser necessario ser refeito. Caso seja necessário delete a pasta migrations e execute os seguintes passos

Add-migration Guide
Update-database

O front foi compilado usando o comando "npm run-script build" no visual studio code e portanto pode ser que seja necessario abrir a pasta ClientApp e rodar novamente no terminal. 

Salvo estes possiveis processos, o sistema deve funcionar normalmente. 
