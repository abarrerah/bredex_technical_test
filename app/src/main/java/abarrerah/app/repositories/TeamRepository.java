package abarrerah.app.repositories;

import abarrerah.app.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Integer> {

    @Modifying
    @Query("update Team t set t.name=:name, t.foundationYear=:foundationYear, t.champions=:champions, t.paidEntryFee=:paidEntryFee where t.id = :id")
    Integer updateTeam(@Param(value = "id") Integer id, @Param(value = "name") String name, @Param(value = "foundationYear") int foundationYear, @Param(value = "champions") int champions, @Param(value = "paidEntryFee") boolean paidEntryFee);


}
