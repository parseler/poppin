package com.apink.poppin.api.user.repository;

import com.apink.poppin.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickname(String nickname);

    Optional<User> findUserByUserTsid(long userTsid);

    User findUserByProviderId(String providerId);
}
