package com.hackathon.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "container")
public class Container {

    @Id
    private String id;

    @Column
    private String type;

    @Column
    private String center;

    @Column
    private String location;

    @Column
    private double latitud;

    @Column
    private double longitud;

    @Column
    private int capacity;

    @Column
    private String unit;

}
