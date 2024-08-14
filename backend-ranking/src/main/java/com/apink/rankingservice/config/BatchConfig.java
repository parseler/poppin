package com.apink.rankingservice.config;

import com.apink.rankingservice.dto.PopupRankingDto;
import com.apink.rankingservice.entity.PopupRanking;
import com.apink.rankingservice.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class BatchConfig {

    private final RankingService rankingService;

    @Bean
    public Job updatePopupRankingJob(JobRepository jobRepository, Step updatePopupRankingStep) {
        return new JobBuilder("updatePopupRankingJob", jobRepository)
                .start(updatePopupRankingStep)
                .build();
    }

    @Bean
    public Step updatePopupRankingStep(JobRepository jobRepository,
                                       @Qualifier("mainTransactionManager") PlatformTransactionManager mainTransactionManager,
                                       @Qualifier("transactionManager") PlatformTransactionManager rankingTransactionManager,
                                       JdbcCursorItemReader<PopupRankingDto> reader) {
        return new StepBuilder("updatePopupRankingStep", jobRepository)
                .<PopupRankingDto, PopupRanking>chunk(100, rankingTransactionManager)
                .reader(reader)
                .processor(this::processPopupRanking)
                .writer(rankingService::deleteAllAndSave)
                .build();
    }

    @Bean
    public JdbcCursorItemReader<PopupRankingDto> reader(@Qualifier("mainServiceDataSource") DataSource dataSource) {
        return new JdbcCursorItemReaderBuilder<PopupRankingDto>()
                .dataSource(dataSource)
                .name("popupRankingReader")
                .sql("""
                    SELECT p.popup_id as popupId, p.start_date as creationDate, 
                           p.hit as views,
                           COALESCE(h.heart_count, 0) as likes,
                           COALESCE(p.rating, 0) as reviewScore,
                           COALESCE(r.review_count, 0) as reviewCount,
                           COALESCE(pr.reservation_count, 0) as reservations
                    FROM popup p
                    LEFT JOIN (SELECT popup_id, COUNT(*) as heart_count 
                               FROM heart 
                               GROUP BY popup_id) h ON p.popup_id = h.popup_id
                    LEFT JOIN (SELECT popup_id, COUNT(*) as review_count 
                               FROM review 
                               WHERE is_deleted = false 
                               GROUP BY popup_id) r ON p.popup_id = r.popup_id
                    LEFT JOIN (SELECT popup_id, COUNT(*) as reservation_count 
                               FROM pre_reservation 
                               GROUP BY popup_id) pr ON p.popup_id = pr.popup_id
                    WHERE p.deleted = false AND p.end_date > now() AND p.start_date <= now()
                    """)
                .rowMapper(new BeanPropertyRowMapper<>(PopupRankingDto.class))
                .build();
    }

    private PopupRanking processPopupRanking(PopupRankingDto dto) {
        return PopupRanking.builder()
                .popupId(dto.getPopupId())
                .views(dto.getViews())
                .likes(dto.getLikes())
                .reviewScore(dto.getReviewScore())
                .reviewCount(dto.getReviewCount())
                .reservations(dto.getReservations())
                .creationDate(dto.getCreationDate())
                .build();
    }
}