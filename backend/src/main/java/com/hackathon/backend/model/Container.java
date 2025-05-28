package com.hackathon.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Container {

    private String id;
    private String type;
    private String center;
    private String location;
    private double latitude;
    private double longitude;
    private int capacity;
    private String unit;
}
