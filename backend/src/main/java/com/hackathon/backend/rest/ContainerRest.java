package com.hackathon.backend.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.backend.model.Container;
import com.hackathon.backend.model.ContainerLevel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
public class ContainerRest {

    @GetMapping("/api")
    public ResponseEntity<String> getLevels() {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                      .uri(URI.create("https://hackaton-campus-sostenible-api.mmartinez-d6a.workers.dev/containers/measurements"))
                      .header("Authorization", "Bearer campus-sostenible-2025")
                      .GET()
                      .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.ok(response.body());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

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

    @GetMapping("/level")
    public ResponseEntity<List<ContainerLevel>> getContainersLevel() {
        return null;
    }
}
