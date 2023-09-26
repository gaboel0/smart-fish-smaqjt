package com.unimar.smartfish.service.sensor;

import com.google.api.core.ApiFuture;
import java.sql.Timestamp;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.unimar.smartfish.dto.sensor.SensorDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class SensorService {
    public void registry(SensorDto dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("sensors").add(dto);
        System.out.println(collectionsApiFuture.get().toString());
        System.out.println("Sensores registrados com sucesso");
    }

    public SensorDto getRegistryById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("sensors").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        SensorDto dto;
        if (document.exists()) {
            String identifier = document.getString("identifier");
            double temp = document.getDouble("temp");
            double ph = document.getDouble("ph");
            double water_level = document.getDouble("water_level");
            double turbidity = document.getDouble("turbidity");
            Timestamp created_at = document.getTimestamp("created_at").toSqlTimestamp();

            dto = new SensorDto(identifier, temp, ph, water_level, turbidity, created_at);
            return dto;
        }
        return null;
    }

    public List<SensorDto> getAllRegistryByIdentifier(String identifier) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("sensors").whereEqualTo("identifier", identifier);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<SensorDto> sensorDtos = new ArrayList<>();
        for (QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
            String documentId = document.getId();
            double temp = document.getDouble("temp");
            double ph = document.getDouble("ph");
            double water_level = document.getDouble("water_level");
            double turbidity = document.getDouble("turbidity");
            Timestamp created_at = document.getTimestamp("created_at").toSqlTimestamp();

            SensorDto dto = new SensorDto(identifier, temp, ph, water_level, turbidity, created_at);
            sensorDtos.add(dto);
        }

        return sensorDtos;
    }
}
