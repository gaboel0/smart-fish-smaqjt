package com.unimar.smartfish.config;

import com.unimar.smartfish.constant.RabbitMQConstant;
import org.springframework.amqp.core.*;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class RabbitMQConfig {
    private static final String EXCHANGE_NAME = "amq.topic";
    private AmqpAdmin amqpAdmin;

    //  Construtor: Cria o objeto em memória
    public RabbitMQConfig(AmqpAdmin amqpAdmin) {
        this.amqpAdmin = amqpAdmin;
    }

    private Queue queue(String name) {
        return new Queue(name, true, false, false);
    }

    private TopicExchange topicExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    private Binding binding(Queue queue, TopicExchange exchange) {
        return new Binding(queue.getName(), Binding.DestinationType.QUEUE, exchange.getName(), queue.getName(), null);
    }

    @PostConstruct
    private void add() {
        Queue statusQueue = this.queue(RabbitMQConstant.STATUS_ESP);
        Queue registryQueue = this.queue(RabbitMQConstant.REGISTRY_ESP);

        TopicExchange exchange = this.topicExchange();

        Binding statusLink = this.binding(statusQueue, exchange);
        Binding registryLink = this.binding(registryQueue, exchange);

        //  Criando as filas no RabbitMQ
        this.amqpAdmin.declareQueue(statusQueue);
        this.amqpAdmin.declareQueue(registryQueue);

        this.amqpAdmin.declareExchange(exchange);

        this.amqpAdmin.declareBinding(statusLink);
        this.amqpAdmin.declareBinding(registryLink);
    }
}
