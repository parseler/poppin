package com.apink.poppin.api.reservation.service;

import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;
import com.apink.poppin.api.reservation.entity.OnsiteReservation;
import com.apink.poppin.api.reservation.repository.OnsiteReservationRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OnsiteReservationServiceImpl implements OnsiteReservationService {

    private static final String RESERVATION_KEY = "onsite_reservation:";

    private final OnsiteReservationRepository repo;
    private final RedisTemplate<String, OnsiteReservationDto> redisTemplate;

    public OnsiteReservationServiceImpl(OnsiteReservationRepository repo, RedisTemplate<String, OnsiteReservationDto> redisTemplate) {
        this.repo = repo;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void saveToRedis(OnsiteReservationDto onsiteReservationDto) {
        String key = RESERVATION_KEY + onsiteReservationDto.getPopupId();
        Integer waitNumber = getWaitNumber(key);
        onsiteReservationDto.setWaitNumber(waitNumber);

        redisTemplate.opsForHash().put(key, onsiteReservationDto.getPhoneNumber(), onsiteReservationDto);
    }

    @Override
    public OnsiteReservationDto getFromRedis(String phoneNumber, Long popupId) {
        String key = RESERVATION_KEY + popupId;
        return (OnsiteReservationDto) redisTemplate.opsForHash().get(key, phoneNumber);
    }

    private Integer getWaitNumber(String key) {
        Map<Object, Object> map = redisTemplate.opsForHash().entries(key);
        return map.size() + 1;
    }
}
