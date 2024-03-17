package abarrerah.app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="team", uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Team {
    @Id
    @GeneratedValue
    private Integer id;
    @Basic
    @Column(nullable = false)
    private String name;
    private Integer foundationYear;
    private Integer champions;
    private Boolean paidEntryFee;
}
