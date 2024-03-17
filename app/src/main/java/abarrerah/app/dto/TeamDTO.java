package abarrerah.app.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDTO {

    private int id;
    private String name;
    private int foundationYear;
    private int champions;
    private Boolean paidEntryFee;
}
