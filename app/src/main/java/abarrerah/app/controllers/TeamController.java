package abarrerah.app.controllers;

import abarrerah.app.dto.TeamDTO;
import abarrerah.app.models.Team;
import abarrerah.app.security.Team.TeamRequest;
import abarrerah.app.security.Team.TeamResponse;
import abarrerah.app.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/team")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class TeamController {

    private final TeamService teamService;

    @GetMapping(value = "all")
    public ResponseEntity<List<Team>> getTeams() throws Exception {
        try {
            List<Team> teams = teamService.listTeams();
            return (!teams.isEmpty()) ? ResponseEntity.ok(teams) : ResponseEntity.notFound().build();

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @PutMapping(value = "update")
    public ResponseEntity<TeamResponse> updateTeam(@RequestBody TeamRequest teamRequest) {
        return ResponseEntity.ok(teamService.updateTeam(teamRequest));
    }

    @PutMapping(value = "create")
    public ResponseEntity<TeamResponse> createTeam(@RequestBody TeamRequest teamRequest) {
        return ResponseEntity.ok(teamService.createTeam(teamRequest));
    }
}
