package abarrerah.app.service;

import abarrerah.app.dto.TeamDTO;
import abarrerah.app.models.Team;
import abarrerah.app.repositories.TeamRepository;
import abarrerah.app.security.Team.CreateTeamRequest;
import abarrerah.app.security.Team.TeamRequest;
import abarrerah.app.security.Team.TeamResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    public TeamDTO getTeam(Integer id) {
        Team team = teamRepository.findById(id).orElse(null);
        if (team != null) {
            return TeamDTO
                    .builder()
                    .id(team.getId())
                    .name(team.getName())
                    .champions(team.getChampions())
                    .foundationYear(team.getFoundationYear())
                    .paidEntryFee(team.getPaidEntryFee())
                    .build();
        }
        return null;
    }

    @Transactional
    public TeamResponse updateTeam(TeamRequest teamRequest) {
        Team team = Team
                .builder()
                .id(teamRequest.getId())
                .name(teamRequest.getName())
                .champions(teamRequest.getChampions())
                .foundationYear(teamRequest.getFoundationYear())
                .paidEntryFee(teamRequest.getPaidEntryFee())
                .build();

        Integer teamUpdated = teamRepository.updateTeam(team.getId(), team.getName(), team.getFoundationYear(), team.getChampions(), team.getPaidEntryFee());

        String teamResponse =(teamUpdated != 0) ? "The team has been modified successfully" : "Something went wrong!";

        return new TeamResponse(teamResponse);
    }

    public List<Team> listTeams(){
        return teamRepository.findAll();
    }

    public TeamResponse createTeam(CreateTeamRequest createTeamRequest) {
        Team team = Team
                .builder()
                .name(createTeamRequest.getName())
                .champions(createTeamRequest.getChampions())
                .foundationYear(createTeamRequest.getFoundationYear())
                .paidEntryFee(createTeamRequest.getPaidEntryFee())
                .build();

        Team teamCreated = teamRepository.save(team);

        return new TeamResponse("The team was created");
    }
}
