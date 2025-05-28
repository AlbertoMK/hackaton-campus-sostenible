package com.hackathon.backend.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.backend.model.Container;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class ContainerRest {

    @GetMapping("/containers")
    public ResponseEntity<List<Container>> getContainers () {
        File archivo = new File("src/main/resources/containers.json");
        System.out.println(archivo.getAbsolutePath());
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<Container> containers = mapper.readValue(archivo, new TypeReference<List<Container>>() {});
            return ResponseEntity.ok(containers);
        } catch (IOException ex) {
            System.err.println(ex);
            return ResponseEntity.internalServerError().body(List.of());
        }
    }
}
