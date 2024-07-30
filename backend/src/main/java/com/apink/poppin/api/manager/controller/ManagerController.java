package com.apink.poppin.api.manager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/managers")
public class ManagerController {

    private final ManagerService managerService;

    @GetMapping("")
    ResponseEntity<?> getManagers() {
    }

    @GetMapping("/me")
    ResponseEntity<?> getMyInfo() {
    }

    @GetMapping("/me/popups")
    ResponseEntity<?> getMyPopups() {
    }

    @GetMapping("/{nickname}/check")
    ResponseEntity<?> checkNickname() {
    }

    @GetMapping("/{managerTsid}")
    ResponseEntity<?> getManager() {
    }

    @PutMapping("/{managerTsid}")
    ResponseEntity<?> updateManager() {
    }

    @DeleteMapping("/{managerTsid}")
    ResponseEntity<?> deleteManager() {
    }
}
