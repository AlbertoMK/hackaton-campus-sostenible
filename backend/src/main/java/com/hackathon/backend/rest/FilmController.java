package com.hackathon.backend.rest;
/*
import com.tarde.backend.DTO.FilmDTO;
import com.tarde.backend.Model.Actor;
import com.tarde.backend.Model.Director;
import com.tarde.backend.Model.Film;
import com.tarde.backend.Model.Writer;
import com.tarde.backend.Repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@RestController
@RequestMapping("/api")
public class FilmController {

    private FilmRepository filmRepository;
    static final Map<String, Function<Film, Object>> attributeGetters = new HashMap<>();

    static {
        attributeGetters.put("actor", Film::getActors);
        attributeGetters.put("director", Film::getDirectors);
        attributeGetters.put("name", Film::getName);
        attributeGetters.put("badget", Film::getBudget);
    }

    @Autowired
    public FilmController(FilmRepository filmRepository, RestClient.Builder builder) {
        this.filmRepository = filmRepository;
    }


    @GetMapping("/films")
    public ResponseEntity<List<FilmDTO>> getFilms() {
        String atr = "actor";
        String valor = "actor1";
        try {
            List<Film> films = filmRepository.findAll();
            films.stream().filter(f -> attributeGetters.get(atr).equals(valor));
            films.sort((f1, f2) -> Long.compare(f1.getBudget(), f2.getBudget()));
            List<FilmDTO> filmsDTO = films.stream().map(f -> new FilmDTO(
                      f.getRank(),
                      f.getName(),
                      f.getYear(),
                      f.getBudget(),
                      f.getDirectors().stream().map(Director::getName).toList(),
                      f.getWriters().stream().map(Writer::getName).toList(),
                      f.getActors().stream().map(Actor::getName).toList())).toList();
            return ResponseEntity.ok(filmsDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw e;
        }
    }

    @GetMapping("/films/directors")
    public ResponseEntity<List<FilmDTO>> getFilmsByDirector(@RequestParam String director) {
        try {
            List<Film> films = filmRepository.findByDirectors_Name(director);
            List<FilmDTO> filmsDTO = films.stream().map(f -> new FilmDTO(
                      f.getRank(),
                      f.getName(),
                      f.getYear(),
                      f.getBudget(),
                      f.getDirectors().stream().map(Director::getName).toList(),
                      f.getWriters().stream().map(Writer::getName).toList(),
                      f.getActors().stream().map(Actor::getName).toList())).toList();
            return ResponseEntity.ok(filmsDTO);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().body(List.of());
        }
    }

    @GetMapping("/films/budget")
    public ResponseEntity<List<FilmDTO>> getFilmsByBudget(@RequestParam Long budget) {
        try {
            List<Film> films = filmRepository.findByBudget(budget);
            List<FilmDTO> filmDTOS = films.stream().map(f ->  new FilmDTO(
                      f.getRank(),
                      f.getName(),
                      f.getYear(),
                      f.getBudget(),
                      f.getDirectors().stream().map(Director::getName).toList(),
                      f.getWriters().stream().map(Writer::getName).toList(),
                      f.getActors().stream().map(Actor::getName).toList()
            )).toList();
            return ResponseEntity.ok(filmDTOS);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(List.of());
        }
    }

    @GetMapping("/films/budget/less")
    public ResponseEntity<List<FilmDTO>> getFilsByBudgetLessThan(@RequestParam Long budget) {
        try {
            List<Film> films = filmRepository.findByBudgetLessThan(budget);
            List<FilmDTO> filmDTOS = films.stream().map(film -> new FilmDTO(
                      film.getRank(),
                      film.getName(),
                      film.getYear(),
                      film.getBudget(),
                      film.getDirectors().stream().map(Director::getName).toList(),
                      film.getWriters().stream().map(Writer::getName).toList(),
                      film.getActors().stream().map(Actor::getName).toList()
            )).toList();
            return ResponseEntity.ok(filmDTOS);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(List.of());
        }
    }
}

 */
