package com.apink.rankingservice.controller;

import com.apink.rankingservice.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rankings")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/top")
    public ResponseEntity<?> getTopRankedPopups(@RequestParam(defaultValue = "20") int limit) {
        return ResponseEntity.ok(rankingService.getTopRankedPopups(limit));
    }

    @GetMapping("/popup/{popupId}")
    public ResponseEntity<?> getPopupRank(@PathVariable String popupId) {
        return ResponseEntity.ok(rankingService.getPopupRank(popupId));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateRankings() {
        rankingService.updateRankings();

        return ResponseEntity.ok().build();
    }
}