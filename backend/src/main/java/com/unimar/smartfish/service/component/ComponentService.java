package com.unimar.smartfish.service.component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.unimar.smartfish.dto.component.ComponentDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.concurrent.ExecutionException;

@Service
public class ComponentService {

    //  @Autowired: Permite que o spring resolva e injete a classe(bean) instanciando o objeto.
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Transactional
    public void create(ComponentDto dto) throws ExecutionException, InterruptedException {
        System.out.println("Identificador:" + dto.getIdentifier());
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("components").document(dto.getIdentifier());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        System.out.println("Identificador" + dto.getIdentifier());

        if (!document.exists()) {
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("components").document(dto.getIdentifier()).set(dto);
            System.out.println("Componente criado com sucesso");
            System.out.println(collectionsApiFuture.get().getUpdateTime().toString());
        }
    }

    public void activate(ComponentDto componentDto){
        System.out.println("mac 0 = " + componentDto.getIdentifier());
        System.out.println("active 0 = " + componentDto.getActive());
        System.out.println("angle 0 = " + componentDto.getAngle());
        System.out.println("time 0 = " + componentDto.getTime());

        try {
            this.rabbitTemplate.convertAndSend("mqtt-subscription-"  + componentDto.getIdentifier() + "qos0", this.objectMapper.writeValueAsString(componentDto));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
