package com.unimar.smartfish.controller.sensor;

import com.unimar.smartfish.dto.sensor.SensorDto;
import com.unimar.smartfish.service.sensor.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping(value = "sensor")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @GetMapping("/registry/{id}")
    public ResponseEntity<SensorDto> getRegistryById(@PathVariable String id) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(sensorService.getRegistryById(id));
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<List<SensorDto>> getAllRegistryByIdentifier(@PathVariable String identifier) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(sensorService.getAllRegistryByIdentifier(identifier));
    }
}
