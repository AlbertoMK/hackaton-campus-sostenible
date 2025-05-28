package com.hackathon.backend.model;
/*
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(exclude = {"directors", "writers", "actors"})
@Entity(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int rank;

    @Column
    private String name;

    @Column
    private int year;

    @Column
    private double rating;

    @Column
    private String certificate;

    @Column
    private String runTime;

    @Column(length = 500)
    private String tagline;

    @Column
    private Long budget;

    @Column
    private Long boxOffice;

    @ManyToMany
    @JoinTable(
              name = "actorinfilm",
              joinColumns = @JoinColumn(name = "film_id"),
              inverseJoinColumns = @JoinColumn(name = "actor_name", referencedColumnName = "name")
    )
    private Set<Actor> actors = new HashSet<>();

    @ManyToMany
    @JoinTable(
              name = "writerinfilm",
              joinColumns = @JoinColumn(name = "film_id"),
              inverseJoinColumns = @JoinColumn(name = "writer_name", referencedColumnName = "name")
    )
    private Set<Writer> writers = new HashSet<>();

    @ManyToMany
    @JoinTable(
              name = "directorinfilm",
              joinColumns = @JoinColumn(name = "film_id"),
              inverseJoinColumns = @JoinColumn(name = "director_name", referencedColumnName = "name")
    )
    private Set<Director> directors = new HashSet<>();
}

 */