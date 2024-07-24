package com.apink.poppin.api.user.service;

import com.apink.poppin.api.user.dto.UserDto;

public interface UserService {

    void verifyNicknameAvailable(String nickname);

    UserDto.Response findUser(long userTsid);

    void updateUser(UserDto.Put userDto);
}
