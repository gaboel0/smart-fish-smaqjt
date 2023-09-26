package com.unimar.smartfish.consumer.component;

import com.unimar.smartfish.constant.RabbitMQConstant;
import com.unimar.smartfish.dto.component.ComponentDto;
import com.unimar.smartfish.service.component.ComponentService;
import org.json.JSONObject;
import org.springframework.amqp.ImmediateAcknowledgeAmqpException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ComponentConsumer {

    @Autowired
    private ComponentService componentService;

    //  @RabbitListener: Marca um método para ser um ouvinte de mensagens de uma fila do RabbitMQ.
    @RabbitListener(queues = RabbitMQConstant.STATUS_ESP)
    private void createComponent(String response){
        try {
            JSONObject json = new JSONObject(response);
            System.out.println(json);
            String identifier = json.getString("identifier");
            Boolean active = json.getBoolean("active");
            Integer angle = json.getInt("angle");
            Integer time = json.getInt("time");

            componentService.create(new ComponentDto(identifier, active, angle, time));
        } catch (Exception e) {
            e.printStackTrace();
            throw new ImmediateAcknowledgeAmqpException("Falha ao criar o componente: " + e.getLocalizedMessage());
        }
    }
}
