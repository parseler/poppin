package com.apink.poppin.api.user.service;

import com.apink.poppin.api.user.dto.UserDto;
import com.apink.poppin.api.user.entity.User;
import com.apink.poppin.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public void verifyNicknameAvailable(String nickname) {
        isNicknameAvailable(nickname);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto.Response findUser(long userTsid) {
        User user = findByUserByUserTsid(userTsid);

        return UserDto.Response.builder()
                .userTsid(user.getUserTsid())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
//                .userCategories();
                .build();

    }

    @Override
    @Transactional
    public void updateUser(UserDto.Put userDto) {

    }


    private void isNicknameAvailable(String nickname) {
        if(userRepository.existsByNickname(nickname)) {
//            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXIST);
        }
    }

    private User findByUserByUserTsid(long userTsid) {
        Optional<User> user = userRepository.findUserByUserTsid(userTsid);

        User findUser = user
                .orElseThrow(() -> new RuntimeException("User not found"));

        return findUser;
    }
}
