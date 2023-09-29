# Relatório do Projeto de Programação Orientada a Objetos (POO)

Este é um relatório do projeto de Programação Orientada a Objetos (POO) realizado por um aluno de Ciência da Computação. O projeto é composto por vários arquivos Java que fazem parte de um sistema. Abaixo, estão detalhados os principais elementos encontrados nos arquivos.

## Codificou classes?
- Sim, o projeto contém várias classes Java que desempenham papéis específicos no sistema. Aqui estão as principais classes:

### SmartfishApplication.java
- Esta classe é responsável por iniciar o aplicativo.

### FirebaseConfig.java
- Esta classe configura a conexão com o Firebase.

### RabbitMQConfig.java
- Esta classe configura o RabbitMQ, incluindo filas e trocas.

### RabbitMQConstant.java
- Este arquivo contém constantes usadas para nomes de filas e trocas.

### ComponentConsumer.java
- Esta classe consome mensagens do RabbitMQ relacionadas a componentes.

### SensorConsumer.java
- Esta classe consome mensagens do RabbitMQ relacionadas a sensores.

### ComponentController.java
- Este controlador gerencia componentes no sistema.

### SensorController.java
- Este controlador gerencia sensores no sistema.

### Response.java
- Esta classe define uma estrutura de resposta para as requisições.

### ComponentDto.java
- Esta classe define objetos de dados relacionados a componentes.

### SensorDto.java
- Esta classe define objetos de dados relacionados a sensores.

### ComponentService.java
- Esta classe lida com a lógica de negócios relacionada a componentes.

### SensorService.java
- Esta classe lida com a lógica de negócios relacionada a sensores.

## Codificou atributos?
- Sim, várias classes definem atributos para armazenar informações. Aqui estão alguns dos atributos encontrados no projeto:

### Em ComponentDto.java:
- `identifier`: Identificador do componente.
- `active`: Indica se o componente está ativo.
- `angle`: Ângulo do componente.
- `time`: Tempo do componente.

### Em SensorDto.java:
- `identifier`: Identificador do sensor.
- `temp`: Temperatura registrada pelo sensor.
- `ph`: Valor de pH registrado pelo sensor.
- `water_level`: Nível de água registrado pelo sensor.
- `turbidity`: Turbidez registrada pelo sensor.
- `created_at`: Data e hora de criação do registro.

## Codificou métodos?
- Sim, várias classes contêm métodos que realizam operações específicas. Aqui estão alguns dos métodos encontrados no projeto:

### Em ComponentService.java:
- `create(ComponentDto dto)`: Cria um novo componente no sistema.
- `activate(ComponentDto componentDto)`: Ativa um componente no sistema.

### Em SensorService.java:
- `registry(SensorDto dto)`: Registra um novo sensor no sistema.
- `getRegistryById(String id)`: Obtém um registro de sensor por ID.
- `getAllRegistryByIdentifier(String identifier)`: Obtém todos os registros de sensor por identificador.

## Codificou atributos estáticos?
- Sim, alguns métodos são marcados como estáticos, o que significa que podem ser chamados sem criar uma instância da classe. Aqui estão exemplos:

### Em FirebaseConfig.java:
- `private static final String EXCHANGE_NAME`: Nome da troca no RabbitMQ.

## Codificou métodos estáticos?
- Sim, alguns métodos são marcados como estáticos e são usados para operações específicas. Aqui estão exemplos:

### Em FirebaseConfig.java:
- `public static void init()`: Inicializa a configuração do Firebase.

## Codificou métodos construtores?
- Sim, várias classes têm construtores que são usados para criar objetos a partir dessas classes. Aqui estão exemplos:

### Em ComponentService.java:
- Construtor padrão para inicializar a classe.

## Codificou atributos protegidos e/ou privados?
- Sim, alguns atributos são definidos como protegidos ou privados para encapsular a implementação. Aqui estão exemplos:

### Em FirebaseConfig.java:
- `private AmqpAdmin amqpAdmin`: Atributo privado para administração do RabbitMQ.

## Codificou métodos protegidos e/ou privados?
- Sim, alguns métodos são definidos como protegidos ou privados para encapsular a implementação. Aqui estão exemplos:

### Em ComponentConsumer.java:
- `private void createComponent(String response)`: Método privado para criar um componente com base em uma mensagem do RabbitMQ.

## Codificou interfaces ou classes puramente virtuais?
- Não foram usadas interfaces ou classes puramente virtuais no projeto.

## Codificou classes abstratas ou classes virtuais?
- Não foram usadas classes abstratas ou classes virtuais no projeto.

## Instanciou objetos?
- Sim, objetos são instanciados a partir das classes definidas no projeto. Por exemplo, instâncias de `ComponentDto` e `SensorDto` são criadas para representar componentes e sensores.

## Instalou e usou bibliotecas de terceiros?
- Sim, o projeto utiliza bibliotecas de terceiros, como o Firebase e o Spring AMQP, para facilitar a comunicação com o Firebase e o RabbitMQ.

## Codificou enums?
- Sim, o arquivo `RabbitMQConstant.java` define enums para representar nomes de filas e trocas no RabbitMQ.

## Identificou e codificou classes de dados?
- Sim, as classes `ComponentDto` e `SensorDto` são exemplos de classes de dados que armazenam informações sobre componentes e sensores.

## Identificou e codificou classes de comportamento?
- Sim, as classes `ComponentService` e `SensorService` são exemplos de classes de comportamento que lidam com a lógica de negócios relacionada a componentes e sensores.

## Usou polimorfismo?
- Não foi identificado o uso de polimorfismo no projeto.

## Usou objetos imutáveis?
- Sim, as classes `ComponentDto` e `SensorDto` são imutáveis, o que significa que seus atributos não podem ser modificados após a criação. Isso ajuda a manter a integridade dos dados.

## Usou diagramas UML para discutir a solução?
- Não foram fornecidos diagramas UML no projeto.

## Ocultou informações usando atributos e/ou métodos protected/private?
- Sim, alguns atributos e métodos são definidos como protegidos ou privados para encapsular a implementação interna das classes e evitar o acesso direto a eles.

### Em FirebaseConfig.java:
- `private AmqpAdmin amqpAdmin`: Atributo privado para administração do RabbitMQ.

### Em ComponentConsumer.java:
- `private void createComponent(String response)`: Método privado para criar um componente com base em uma mensagem do RabbitMQ.

## Ocultou informações usando interfaces ou classes puramente virtuais?
- Não foram usadas interfaces ou classes puramente virtuais no projeto.

## Codificou classes imutáveis?
- Sim, as classes `ComponentDto` e `SensorDto` são exemplos de classes imutáveis, o que significa que seus atributos não podem ser modificados após a criação. Isso ajuda a manter a integridade dos dados.

Este é um resumo das principais características do projeto de POO. As classes e métodos desempenham papéis específicos no sistema, permitindo que ele funcione corretamente.
