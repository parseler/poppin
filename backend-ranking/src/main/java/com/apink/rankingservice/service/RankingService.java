package com.apink.rankingservice.service;

import com.apink.rankingservice.entity.PopupRanking;
import com.apink.rankingservice.repository.PopupRankingRepository;
import com.apink.rankingservice.dto.PopupRankingDto;
import com.apink.rankingservice.scheduler.BatchScheduler;
import com.apink.rankingservice.util.RankCalculator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.Chunk;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final PopupRankingRepository popupRankingRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String RANKING_KEY = "popup_rankings";
    private static final Logger logger = LoggerFactory.getLogger(RankingService.class);

    @CacheEvict(value = {"topRankedPopups", "popupRank"}, allEntries = true)
    public void updateRankings() {
        logger.debug("업데이트");
        List<PopupRankingDto> popupData = popupRankingRepository.findAll()
                .stream()
                .map(this::PopupRankingToPopupRankingDto)
                .toList();

        logger.debug("findAll 완료");
        List<RankedPopup> rankedPopups = popupData.stream()
                .map(data -> new RankedPopup(data.getPopupId(), RankCalculator.calculatePopupRank(data)))
                .sorted((a, b) -> Double.compare(b.getScore(), a.getScore()))
                .toList();

        logger.debug("계산 완료");
        redisTemplate.opsForZSet().removeRange(RANKING_KEY, 0, -1);
        for (int i = 0; i < rankedPopups.size(); i++) {
            RankedPopup rankedPopup = rankedPopups.get(i);
            redisTemplate.opsForZSet().add(RANKING_KEY, rankedPopup.getPopupId(), rankedPopup.getScore());
        }
    }

    @Cacheable(value = "topRankedPopups", key = "#limit")
    public List<Long> getTopRankedPopups(int limit) {
        Set<Object> rankedPopups = redisTemplate.opsForZSet().reverseRange(RANKING_KEY, 0, limit - 1);
        assert rankedPopups != null;
        return rankedPopups.stream()
                .map(popupId -> ((Integer) popupId).longValue())
                .collect(Collectors.toList());
    }

    @Cacheable(value = "popupRank", key = "#popupId")
    public Long getPopupRank(String popupId) {
        return redisTemplate.opsForZSet().reverseRank(RANKING_KEY, popupId);
    }

    @Getter
    private static class RankedPopup {
        private final Long popupId;
        private final double score;

        RankedPopup(Long popupId, double score) {
            this.popupId = popupId;
            this.score = score;
        }
    }

    @Transactional(transactionManager = "transactionManager")
    public void deleteAllAndSave(Chunk<? extends PopupRanking> popupRankings) {
        popupRankingRepository.deleteAll();
        popupRankingRepository.saveAll(popupRankings);
    }

    private PopupRankingDto PopupRankingToPopupRankingDto(PopupRanking popupRanking) {
        return PopupRankingDto.builder()
                .popupId(popupRanking.getPopupId())
                .likes(popupRanking.getLikes())
                .views(popupRanking.getViews())
                .creationDate(popupRanking.getCreationDate())
                .reservations(popupRanking.getReservations())
                .reviewCount(popupRanking.getReviewCount())
                .reviewScore(popupRanking.getReviewScore())
                .build();
    }

}
