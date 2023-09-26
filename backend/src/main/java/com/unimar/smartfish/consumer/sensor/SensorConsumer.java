package com.unimar.smartfish.consumer.sensor;

import com.unimar.smartfish.constant.RabbitMQConstant;
import com.unimar.smartfish.dto.sensor.SensorDto;
import com.unimar.smartfish.service.sensor.SensorService;
import org.json.JSONObject;
import org.springframework.amqp.ImmediateAcknowledgeAmqpException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class SensorConsumer {

    @Autowired
    private SensorService sensorService;

    //  @RabbitListener: Marca um método para ser um ouvinte de mensagens de uma fila do RabbitMQ.
    @RabbitListener(queues = RabbitMQConstant.REGISTRY_ESP)
    private void registrySensor(String response) {
        try {
            JSONObject json = new JSONObject(response);
            System.out.println(json);

            String identifier = json.getString("identifier");
            double temp = json.getDouble("temp");
            double ph = json.getDouble("ph");
            double water_level = json.getDouble("water_level");
            double turbidity = json.getDouble("turbidity");
            LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
            Timestamp created_at = Timestamp.valueOf(now);

            sensorService.registry(new SensorDto(identifier, temp, ph, water_level, turbidity, created_at));
        } catch (Exception e) {
            e.printStackTrace();
            throw new ImmediateAcknowledgeAmqpException("Falha ao criar o componente: " + e.getLocalizedMessage());
        }
    }
}
