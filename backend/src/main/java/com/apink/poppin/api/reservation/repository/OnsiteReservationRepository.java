package com.apink.poppin.api.reservation.repository;

import com.apink.poppin.api.reservation.entity.OnsiteReservation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OnsiteReservationRepository extends JpaRepository<OnsiteReservation, Long> {

    @EntityGraph(attributePaths = {"reservationStatement"}, type = EntityGraph.EntityGraphType.FETCH)
    @NonNull
    Optional<OnsiteReservation> findById(@NonNull Long id);

    List<OnsiteReservation> findByPhoneNumber(String phoneNumber);
}
