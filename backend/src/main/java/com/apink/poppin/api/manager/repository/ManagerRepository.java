package com.apink.poppin.api.manager.repository;

import com.apink.poppin.api.manager.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {

    Manager findByNickname(String nickname);
}
