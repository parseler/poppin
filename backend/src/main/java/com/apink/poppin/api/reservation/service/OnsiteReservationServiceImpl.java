package com.apink.poppin.api.reservation.service;

import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;
import com.apink.poppin.api.reservation.dto.OnsiteReservationRedisDto;
import com.apink.poppin.api.reservation.dto.OnsiteReservationRequestDto;
import com.apink.poppin.api.reservation.entity.OnsiteReservation;
import com.apink.poppin.api.reservation.entity.ReservationStatement;
import com.apink.poppin.api.reservation.repository.OnsiteReservationRepository;
import com.apink.poppin.common.exception.dto.BusinessLogicException;
import com.apink.poppin.common.exception.dto.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OnsiteReservationServiceImpl implements OnsiteReservationService {

    private static final String RESERVATION_KEY_POPUP = "ONSITE_BY_POPUP_";
    private static final String RESERVATION_KEY_PHONE = "ONSITE_BY_PHONE_";

    // popup id를 통해 접근. 대기 번호 설정을 위해 sorted set 사용
    private final ZSetOperations<String, Object> zSetOperations;

    // 사용자가 다른 팝업에 대기하고자 하는 경우 전화번호만으로 대기 중인 정보 조회
    private final ValueOperations<String, Object> valueOperations;

    private final OnsiteReservationRepository onsiteReservationRepository;
    private final PopupRepository popupRepository;

    @Override
    @Transactional
    public OnsiteReservationDto createOnsiteReservation(OnsiteReservationDto onsiteReservationDto) {

        String keyByPopup = RESERVATION_KEY_POPUP + onsiteReservationDto.getPopupId();
        String keyByPhone = RESERVATION_KEY_PHONE + onsiteReservationDto.getPhoneNumber();

        if (valueOperations.get(keyByPhone) != null) {
            throw new IllegalStateException("Onsite reservation already exists");
        }

        Popup popup = popupRepository.findById(onsiteReservationDto.getPopupId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POPUP_NOT_FOUND));
        ReservationStatement reservationStatement = ReservationStatement.builder()
                .reservationStatementId(1L).build();

        Integer waitNumber = getWaitNumber(keyByPopup);

        OnsiteReservation reservation = OnsiteReservation.builder()
                .popup(popup)
                .phoneNumber(onsiteReservationDto.getPhoneNumber())
                .visitedDate(LocalDate.now())
                .reservationStatement(reservationStatement)
                .reservationCount(onsiteReservationDto.getReservationCount())
                .waitNumber(waitNumber)
                .build();

        OnsiteReservation onsiteReservation = onsiteReservationRepository.save(reservation);

        onsiteReservationDto.createReservation(onsiteReservation.getOnsiteReservationId(), waitNumber);

        double score = makeScore(onsiteReservationDto.getReservationStatementId(), onsiteReservationDto.getWaitNumber());

        OnsiteReservationRedisDto redisDto = OnsiteReservationRedisDto.builder().build();
        redisDto.makeRedisDto(onsiteReservationDto);

        zSetOperations.add(keyByPopup, redisDto, score);
        valueOperations.set(keyByPhone, redisDto);

        Integer rank = getRank(keyByPopup, redisDto);
        if (rank == null) {
            throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
        }
        onsiteReservationDto.setRank(rank);

        return onsiteReservationDto;
    }

    @Override
    public OnsiteReservationDto getOnsiteReservationByKakaoLink(long onsiteReservationId, long popupId) {

        String keyByPopup = RESERVATION_KEY_POPUP + popupId;
        Set<Object> reservations = zSetOperations.rangeByScore(keyByPopup, 0, Double.MAX_VALUE);

        assert reservations != null;
        for (Object obj : reservations) {
            if (obj instanceof OnsiteReservationRedisDto redisDto) {
                if (redisDto.getOnsiteReservationRedisId() == onsiteReservationId) {

                    Integer rank = getRank(keyByPopup, redisDto);
                    if (rank == null) {
                        throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
                    }

                    OnsiteReservationDto dto = OnsiteReservationDto.builder().build();
                    dto.makeDtoWithRedisDto(redisDto);
                    dto.setRank(rank);
                    return dto;
                }
            }
        }

        OnsiteReservation onsiteReservation = onsiteReservationRepository.findById(onsiteReservationId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND));

        return OnsiteReservationDto.builder()
                .onsiteReservationId(onsiteReservation.getOnsiteReservationId())
                .popupId(onsiteReservation.getPopup().getPopupId())
                .reservationStatementId(onsiteReservation.getReservationStatement().getReservationStatementId())
                .reservationCount(onsiteReservation.getReservationCount())
                .phoneNumber(onsiteReservation.getPhoneNumber())
                .visitedDate(onsiteReservation.getVisitedDate())
                .waitNumber(onsiteReservation.getWaitNumber())
                .build();
    }

    @Override
    public OnsiteReservationDto getOnsiteReservationByPhoneNumber(String phoneNumber) {

        String keyByPhone = RESERVATION_KEY_PHONE + phoneNumber;
        Object obj = valueOperations.get(keyByPhone);

        if (obj == null) {
            throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
        }

        if (obj instanceof OnsiteReservationRedisDto redisDto) {
            Integer rank;
            String keyByPopup = RESERVATION_KEY_POPUP + redisDto.getPopupId();
            rank = getRank(keyByPopup, redisDto);
            if (rank == null) {
                throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
            }

            OnsiteReservationDto onsiteReservationDto = OnsiteReservationDto.builder().build();
            onsiteReservationDto.makeDtoWithRedisDto(redisDto);
            onsiteReservationDto.setRank(rank);
            return onsiteReservationDto;
        }

        throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
    }

    @Override
    public OnsiteReservationDto changeOnsiteReservation(OnsiteReservationRequestDto onsiteReservationRequestDto) {
        String keyForPopup = RESERVATION_KEY_POPUP + onsiteReservationRequestDto.getPopupId();
        String keyForPhone = RESERVATION_KEY_PHONE + onsiteReservationRequestDto.getPhoneNumber();

        Set<Object> reservations = zSetOperations.rangeByScore(keyForPopup, 0, Double.MAX_VALUE);

        assert reservations != null;
        for (Object obj : reservations) {
            if (obj instanceof OnsiteReservationRedisDto redisDto) {
                if (redisDto.getOnsiteReservationRedisId().equals(onsiteReservationRequestDto.getOnsiteReservationId())
                && redisDto.getPhoneNumber().equals(onsiteReservationRequestDto.getPhoneNumber())
                && valueOperations.get(keyForPhone) != null) {
                    valueOperations.getAndDelete(keyForPhone);
                    zSetOperations.remove(keyForPopup, redisDto);
                    redisDto.changeStatement(onsiteReservationRequestDto.getReservationStatementId());

                    double score = makeScore(onsiteReservationRequestDto.getReservationStatementId(), redisDto.getWaitNumber());
                    zSetOperations.add(keyForPopup, redisDto, score);

                    OnsiteReservationDto onsiteReservationDto = OnsiteReservationDto.builder().build();
                    onsiteReservationDto.makeDtoWithRedisDto(redisDto);

                    return onsiteReservationDto;
                }
            }
        }

        throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
    }

    private Integer getWaitNumber(String key) {
        Long size = zSetOperations.size(key);
        if (size == null) return 1;

        return size.intValue() + 1;
    }

    private double makeScore(long reservationStatementId, int waitNumber) {
        return reservationStatementId * 10000 + waitNumber;
    }

    private Integer getRank(String key, OnsiteReservationRedisDto dto) {

        Long rank = zSetOperations.rank(key, dto);

        if (rank == null) return null;

        return rank.intValue();
    }
}
