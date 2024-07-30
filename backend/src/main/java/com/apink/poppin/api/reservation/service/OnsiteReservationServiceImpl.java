package com.apink.poppin.api.reservation.service;

import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;
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
import java.util.Collections;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OnsiteReservationServiceImpl implements OnsiteReservationService {

    private static final String RESERVATION_KEY_POPUP = "ONSITE BY POPUP_";
    private static final String RESERVATION_KEY_PHONE = "ONSITE BY PHONE_";

    // popup id를 통해 접근. 대기 번호 설정을 위해 sorted set 사용
    private final ZSetOperations<String, OnsiteReservationDto> zSetOperations;

    // 사용자가 다른 팝업에 대기하고자 하는 경우 전화번호만으로 대기 중인 정보 조회
    private final ValueOperations<String, OnsiteReservationDto> valueOperations;

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

        OnsiteReservation reservation = OnsiteReservation.builder()
                .popup(popup)
                .phoneNumber(onsiteReservationDto.getPhoneNumber())
                .visitedDate(LocalDate.now())
                .reservationStatement(reservationStatement)
                .reservationCount(onsiteReservationDto.getReservationCount())
                .build();

        OnsiteReservation onsiteReservation = onsiteReservationRepository.save(reservation);

        Integer waitNumber = getWaitNumber(keyByPopup);
        onsiteReservationDto.createReservation(onsiteReservation.getOnsiteReservationId(), waitNumber);

        double score = makeScore(onsiteReservationDto);
        zSetOperations.add(keyByPopup, onsiteReservationDto, score);
        valueOperations.set(keyByPhone, onsiteReservationDto);

        return onsiteReservationDto;
    }

    @Override
    public OnsiteReservationDto getOnsiteReservationByKakaoLink(long onsiteReservationId, long popupId) {

        String keyByPopup = RESERVATION_KEY_POPUP + popupId;
        Set<Object> reservations = Collections.singleton(zSetOperations.rangeByScore(keyByPopup, 0, Double.MAX_VALUE));

        for (Object obj : reservations) {
            OnsiteReservationDto dto = (OnsiteReservationDto) obj;
            if (dto.getOnsiteReservationId() == onsiteReservationId) {
                return dto;
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

        String key = RESERVATION_KEY_PHONE + phoneNumber;
        OnsiteReservationDto onsiteReservationDto = valueOperations.get(key);

        if (onsiteReservationDto == null) {
            throw new BusinessLogicException(ExceptionCode.ONSITE_NOT_FOUND);
        }

        return onsiteReservationDto;
    }

    private Integer getWaitNumber(String key) {
        Long size = zSetOperations.size(key);
        if (size == null) return 1;

        return size.intValue();
    }

    private double makeScore(OnsiteReservationDto onsiteReservationDto) {
        return onsiteReservationDto.getReservationStatementId() * 10000 + onsiteReservationDto.getWaitNumber();
    }
}
