package com.apink.poppin.api.reservation.integration;

import com.apink.poppin.api.reservation.dto.OnsiteReservationDto;
import com.apink.poppin.api.reservation.service.OnsiteReservationServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class OnsiteReservationIntegrationTest {

    @Autowired
    private OnsiteReservationServiceImpl service;

    @Autowired
    private RedisTemplate<String, OnsiteReservationDto> redisTemplate;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper jacksonObjectMapper;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void testOnsiteReservation() throws Exception {
        OnsiteReservationDto dto = OnsiteReservationDto.builder()
                .onsiteReservationId(null)
                .popupId(1L)
                .phoneNumber("010-1234-5678")
                .visitedDate(LocalDate.now())
                .reservationCount(2)
                .reservationStatementId(1)
                .waitNumber(null)
                .build();

        String jsonContent = jacksonObjectMapper.writeValueAsString(dto);

        mockMvc.perform(post("/api/onsite-reservations").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/onsite-reservations/010-1234-5678/1"))
                .andExpect(status().isOk());
    }
}
