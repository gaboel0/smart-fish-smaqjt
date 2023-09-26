package com.unimar.smartfish.dto.sensor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SensorDto implements Serializable {
    private String identifier;
    private double temp;
    private double ph;
    private double water_level;
    private double turbidity;
    private Timestamp created_at;

}
