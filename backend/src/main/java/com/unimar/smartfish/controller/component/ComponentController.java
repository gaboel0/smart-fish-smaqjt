package com.unimar.smartfish.controller.component;

import com.unimar.smartfish.dto.component.ComponentDto;
import com.unimar.smartfish.dto.Response;
import com.unimar.smartfish.service.component.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "component")
public class ComponentController {

    @Autowired
    private ComponentService componentService;

    @PostMapping(value = "activate")
    private ResponseEntity<Response<ComponentDto>> activate(@RequestBody ComponentDto componentDto, BindingResult result){
        Response<ComponentDto> response = new Response<>();

        if (result.hasErrors()) {
            result.getAllErrors().forEach(objectError -> response.getError().add(objectError.getDefaultMessage()));
            return ResponseEntity.badRequest().body(response);
        }

        System.out.println("active 1 = " + componentDto.getActive());
        response.setData(componentDto);

        this.componentService.activate(componentDto);
        return ResponseEntity.ok(response);
    }
}
