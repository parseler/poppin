package com.apink.rankingservice.scheduler;

import com.apink.rankingservice.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@RequiredArgsConstructor
public class BatchScheduler {

    private final JobLauncher jobLauncher;
    private final Job updatePopupRankingJob;
    private final RankingService rankingService;
    private static final Logger logger = LoggerFactory.getLogger(BatchScheduler.class);

    @Scheduled(cron = "0 9 2 * * ?", zone = "Asia/Seoul")
    public void runBatchJob() throws Exception {
        logger.debug("실행완료");
        logger.info("실행?");

        JobParameters jobParameters = new JobParametersBuilder()
                .addLong("time", System.currentTimeMillis())
                .toJobParameters();
        jobLauncher.run(updatePopupRankingJob, jobParameters);

        rankingService.updateRankings();
    }
}