# Relatório do Projeto de Programação Orientada a Objetos (POO)

Este é um relatório do projeto de Programação Orientada a Objetos (POO) realizado por Lucas Vilas Boas Marcelino Valente. Esse projeto é composto por vários arquivos Java, fazendo parte de um sistema. Segue abaixo, os detalhes e os principais elementos encontrados nos arquivos.

## Codificou classes?
- Sim, o projeto contém várias classes Java que desempenham papéis específicos no sistema. Segue as principais classes: 

### SmartfishApplication.java
Esta classe atua como o ponto de partida do aplicativo, sendo responsável por iniciar a execução.

### FirebaseConfig.java
A classe FirebaseConfig.java é responsável por configurar a conexão com o Firebase, estabelecendo os parâmetros necessários para a comunicação eficaz com esse serviço externo.

### RabbitMQConfig.java
RabbitMQConfig.java lida com a configuração do RabbitMQ no projeto. Isso envolve a definição de filas e trocas que são de extrema importância para a comunicação precisa entre componentes do sistema.

### RabbitMQConstant.java
Neste arquivo, encontramos constantes que representam nomes de filas e trocas. Essas constantes são utilizadas em todo o projeto para garantir consistência e evitar erros de digitação.

### ComponentConsumer.java
A classe ComponentConsumer.java implementa a lógica para consumir mensagens relacionadas a componentes provenientes do RabbitMQ. Isso garante a eficiente e a integração de componentes no sistema.

### SensorConsumer.java
Parecido ao ComponentConsumer, SensorConsumer.java é responsável por consumir mensagens do RabbitMQ, mas especificamente relacionadas a sensores. Isso permite que o sistema reaja a eventos e informações dos sensores em tempo real. 

### ComponentController.java
O ComponentController.java atua como um controlador dedicado à gestão de componentes no sistema. Lidando com solicitações e operações relacionadas a esses elementos, garantindo a interação adequada com o banco de dados e outros serviços.

### SensorController.java
Este controlador, SensorController.java, se concentra na gestão de sensores no sistema. Fornecendo endpoints para a manipulação de dados de sensores, incluindo consultas e atualizações.

### Response.java
A classe Response.java define uma estrutura de resposta padronizada para as solicitações. Incuindo campos para dados de resposta e mensagens de erro, facilitando a comunicação entre o servidor e o cliente.

### ComponentDto.java
ComponentDto.java é uma classe que define objetos de dados relacionados a componentes. Contendo atributos como identificação, estado, ângulo e tempo, permitindo que o grupo mude e manipule esses dados. 

### SensorDto.java
Parecido ao ComponentDto, SensorDto.java define objetos de dados voltados para sensores. Incluindo informações como identificação, temperatura, pH, nível de água, turbidez e data de criação. Informações que são vitais para o projeto.

### ComponentService.java
A classe ComponentService.java é responsável pela parte a lógica de negócios dos componentes. Incluindo as operações como criação e ativação de componentes, também como a interação com o banco de dados e outros serviços.

### SensorService.java
SensorService.java faz um papel parecido com o ComponentService, mas focando nos sensores do projeto. Gerenciando o registro de informações dos sensores e fornecendo as funcionalidades que tem relação esses sensores.

## Codificou atributos?
- Sim, várias classes definem atributos para armazenar informações. Aqui estão alguns dos atributos encontrados no projeto:

## Atributos Definidos

Sim, o projeto inclui a definição de atributos em várias classes para armazenar informações específicas. Aqui estão alguns dos atributos encontrados no projeto:

### Em ComponentDto.java:
- `identifier`: Este atributo representa o identificador único de um componente no sistema.
- `active`: É um atributo booleano usado para indicar se o componente está ativo ou não.
- `angle`: Este atributo guarda o ângulo associado ao componente.
- `time`: Representa o tempo relacionado ao componente.

### Em SensorDto.java:
- `identifier`: Similar ao ComponentDto, este atributo representa o identificador exclusivo de um sensor no sistema.
- `temp`: Armazena a temperatura registrada pelo sensor.
- `ph`: Mantém o valor de pH registrado pelo sensor.
- `water_level`: Armazena o nível de água registrado pelo sensor.
- `turbidity`: Registra a turbidez detectada pelo sensor.
- `created_at`: Este atributo guarda a data e hora de criação do registro do sensor.

## Métodos Implementados
Sim, o projeto implementa uma variedade de métodos em várias classes para realizar operações específicas. Abaixo estão alguns dos métodos encontrados no projeto:

### Em ComponentService.java:
- `create(ComponentDto dto)`: Este método é responsável por criar um novo componente no sistema com base nos dados fornecidos por um objeto ComponentDto.
- `activate(ComponentDto componentDto)`: Ativa um componente específico no sistema com base nas informações fornecidas no objeto ComponentDto.

### Em SensorService.java:
- `registry(SensorDto dto)`: Registra um novo sensor no sistema com base nas informações fornecidas por um objeto SensorDto.
- `getRegistryById(String id)`: Recupera um registro de sensor específico com base em seu ID.
- `getAllRegistryByIdentifier(String identifier)`: Obtém todos os registros de sensores associados a um identificador específico.

## Atributos Estáticos

Sim, o projeto contém atributos estáticos em algumas classes. Esses atributos são marcados como "static", o que significa que podem ser acessados sem a necessidade de criar uma instância da classe. Um exemplo disso pode ser encontrado em FirebaseConfig.java:

### Em FirebaseConfig.java:
- `private static final String EXCHANGE_NAME`: Este atributo estático representa o nome da troca no RabbitMQ e é definido como constante, garantindo que seu valor não seja alterado durante a execução do programa.

## Codificou métodos estáticos?
- Sim, alguns métodos são marcados como estáticos e são usados para operações específicas. Aqui estão exemplos:

### Em FirebaseConfig.java:
- `public static void init()`: Inicializa a configuração do Firebase.

## Codificou métodos construtores?
- Sim, várias classes possuem construtores que são utilizados para criar objetos a partir dessas classes. Aqui estão alguns exemplos:

### Em ComponentService.java:
- Construtor padrão usado para inicializar a classe.
  
## Codificou atributos protegidos e/ou privados?
- Sim, alguns atributos são definidos como protegidos ou privados para encapsular a implementação. Aqui estão exemplos:

### Em FirebaseConfig.java:
- `private AmqpAdmin amqpAdmin`: Este é um atributo privado usado para administração do RabbitMQ.

## Codificou métodos protegidos e/ou privados?
- Sim, alguns atributos e métodos são definidos como protegidos ou privados para encapsular a implementação interna das classes e evitar o acesso direto a eles. Segue abaixo os exemplos:

### Em ComponentConsumer.java:
- `private void createComponent(String response)`: Este é um método privado utilizado para criar um componente com base em uma mensagem do RabbitMQ.

## Codificou interfaces ou classes puramente virtuais?
- Não foram usadas interfaces ou classes puramente virtuais no projeto.

## Codificou classes abstratas ou classes virtuais?
- Não foram usadas classes abstratas ou classes virtuais no projeto.

## Instanciou objetos?
-Sim, no projeto, foram criadas instâncias de objetos a partir das classes definidas. Por exemplo, as classes `ComponentDto` e `SensorDto` são instanciadas para representar componentes e sensores.

## Instalou e usou bibliotecas de terceiros?
- Sim, o projeto faz uso de bibliotecas de terceiros, como o Firebase e o Spring AMQP, para simplificar a comunicação com o Firebase e o RabbitMQ

## Codificou enums?
- Sim, no arquivo RabbitMQConstant.java, foram definidos enums para representar os nomes de filas e trocas no RabbitMQ.
  
## Identificou e codificou classes de dados?
-Sim, as classes `ComponentDto` e `SensorDto` são exemplos de classes de dados que armazenam informações sobre componentes e sensores.

## Identificou e codificou classes de comportamento?
- Sim, as classes `ComponentService` e `SensorService` são exemplos de classes de comportamento que gerenciam a lógica de negócios relacionada a componentes e sensores.

## Usou polimorfismo?
- No projeto em questão, não foi empregado o conceito de polimorfismo.

## Usou objetos imutáveis?
- Sim, as classes `ComponentDto` e `SensorDto` são exemplos de objetos imutáveis, o que significa que seus atributos permanecem inalterados após a criação. Isso contribui para garantir a consistência e a integridade dos dados.
  
## Usou diagramas UML para discutir a solução?
- Não foram incluídos diagramas UML no projeto para discutir sua arquitetura e estrutura.

## Ocultou informações usando atributos e/ou métodos protected/private?
- Sim, no projeto, diversos atributos e métodos foram declarados com os níveis de acesso "protected" ou "private" para encapsular a implementação interna das classes e restringir o acesso direto a esses elementos.

### Em FirebaseConfig.java:
- `private AmqpAdmin amqpAdmin`: Este atributo foi declarado como privado para ser usado internamente na administração do RabbitMQ.

### Em ComponentConsumer.java:
- `private void createComponent(String response)`:  Este método foi definido como privado para criar componentes com base em mensagens do RabbitMQ, limitando seu acesso direto.

## Ocultou informações usando interfaces ou classes puramente virtuais?
- No projeto em questão, não foram utilizadas interfaces ou classes puramente virtuais.

## Codificou classes imutáveis?
- Sim, as classes `ComponentDto` e `SensorDto` são exemplos de classes imutáveis, o que implica que seus atributos não podem ser alterados após a criação. Isso desempenha um papel importante na manutenção da consistência e integridade dos dados.

  
Este resumo destaca as características essenciais do projeto de Programação Orientada a Objetos (POO). As classes e métodos desempenham funções específicas no sistema, garantindo seu funcionamento adequado.





