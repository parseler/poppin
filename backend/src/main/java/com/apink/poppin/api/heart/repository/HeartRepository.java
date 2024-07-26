package com.apink.poppin.api.heart.repository;
import com.apink.poppin.api.heart.entity.Heart;
import com.apink.poppin.api.popup.entity.Popup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {

    // 좋아요 확인
//    Optional<Heart> findByMemberAndPopup(Member member, Popup popup);

    // 좋아요 추가
//    Heart save(Heart heart);

    // 좋아요 해제
    void delete(Heart heart);
}
