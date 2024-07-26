package com.apink.poppin.api.user.controller;

import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{nickname}/check")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        userService.verifyNicknameAvailable(nickname);

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> findUser() {
        long userTsid = 0L;
        UserDto.Response user = userService.findUser(userTsid);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateUser(@RequestBody UserDto.Put userDto) {
        String userTsid = "";

        userService.updateUser(userDto);

        return ResponseEntity.ok().build();
    }

}
