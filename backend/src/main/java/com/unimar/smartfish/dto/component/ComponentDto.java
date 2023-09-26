package com.unimar.smartfish.dto.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComponentDto implements Serializable {
    @NotBlank(message = "Identificador não pode estar vazio")
    private String identifier;
    private Boolean active;
    private Integer angle;
    private Integer time;
}
