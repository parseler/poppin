package com.apink.poppin.api.user.controller;

import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{nickname}/check")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        userService.isAvailableNickname(nickname);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> findUser() {
        String userTsid = "";

        UserDto.Response user = userService.findUserByTsid(userTsid);

        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateUser(@RequestBody UserDto.Put userDto) {
        String userTsid = "";


    }

}
