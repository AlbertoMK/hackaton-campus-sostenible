package com.hackathon.backend.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.hackathon.backend.model.Container;
import com.hackathon.backend.model.ContainerLevel;
import com.hackathon.backend.model.ContainerHistory;
import com.hackathon.backend.model.LevelData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ContainerRest {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public String getLevels() {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                      .uri(URI.create("https://hackaton-campus-sostenible-api.mmartinez-d6a.workers.dev/containers/measurements"))
                      .header("Authorization", "Bearer campus-sostenible-2025")
                      .GET()
                      .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/containers")
    public ResponseEntity<List<Container>> getContainers () {
        File archivo = new File("src/main/resources/containers.json");
        System.out.println(archivo.getAbsolutePath());
        try {
            List<Container> containers = objectMapper.readValue(archivo, new TypeReference<List<Container>>() {});
            return ResponseEntity.ok(containers);
        } catch (IOException ex) {
            System.err.println(ex);
            return ResponseEntity.internalServerError().body(List.of());
        }
    }

    @GetMapping("/containersByCenter")
    public ResponseEntity<List<Container>> getContainersByCenter (@RequestParam String center) {
        File archivo = new File("src/main/resources/containers.json");
        try {
            List<Container> containers = objectMapper.readValue(archivo, new TypeReference<List<Container>>() {});
            List<Container> result = containers.stream().filter(c -> c.getCenter().equals(center)).toList();
            return ResponseEntity.ok(result);
        } catch (IOException ex) {
            System.err.println(ex);
            return ResponseEntity.internalServerError().body(List.of());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<ContainerHistory>> getHistory () {
        String json = getLevels();
        try {
            objectMapper.registerModule(new JavaTimeModule());

            List<ContainerHistory> history =  objectMapper.readValue(json, new TypeReference<List<ContainerHistory>>() {});
            if (history.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(history);
        } catch (IOException ex) {
            System.err.println(ex);
            return ResponseEntity.internalServerError().body(List.of());
        }
    }

    @GetMapping("/level")
    public ResponseEntity<List<ContainerLevel>> getContainersLevel() {
        String json = getLevels();
        List<ContainerLevel> containerLevels = new ArrayList<>();
        try {
            objectMapper.registerModule(new JavaTimeModule());
            List<ContainerHistory> history =  objectMapper.readValue(json, new TypeReference<List<ContainerHistory>>() {});
            history.forEach(lh -> {
                LevelData data = lh.getHistory().stream().max((h1, h2) -> h1.getTimestamp().compareTo(h2.getTimestamp())).get();
                containerLevels.add(new ContainerLevel(lh.getId(), data.getLevelPercent()));
            });
            return ResponseEntity.ok(containerLevels);
        } catch (IOException ex) {
            System.err.println(ex);
            return ResponseEntity.internalServerError().body(List.of());
        }
    }
}
