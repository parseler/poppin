package com.apink.poppin.api.heart.service;

import com.apink.poppin.api.heart.dto.HeartRequestDTO;
import com.apink.poppin.api.heart.entity.Heart;
import com.apink.poppin.api.heart.repository.HeartRepository;
import com.apink.poppin.api.popup.entity.Popup;
import com.apink.poppin.api.popup.repository.PopupRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

public class HeartServiceImpl implements HeartService {
    @Autowired
    private HeartRepository heartRepository;

    @Autowired
    private PopupRepository popupRepository;

    @Autowired
//    private MemberRepository memberRepository;


    // 좋아요 추가
    @Transactional
    public void insert(HeartRequestDTO reqDto) throws Exception {
        // 유저 확인
//        Member member = memberRepository.findById(reqDto.getUserId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        // 팝업 확인
        Popup popup = popupRepository.findById(reqDto.getPopupId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid popup ID"));

        // 이미 좋아요되어있으면 에러 반환
//        if (heartRepository.findByMemberAndPopup(member, popup).isPresent()){
//            throw new Exception("Heart is already exists");
//        }

        popup.setHeart(popup.getHeart()+1);

        Heart heart = Heart.builder()
                .popup(popup)
//                .member(member)
                .build();

        heartRepository.save(heart);

    }

    // 좋아요 해제
    @Override
    @Transactional
    public void delete(HeartRequestDTO reqDto) throws Exception {
        // 유저 확인
//        Member member = memberRepository.findById(reqDto.getUserId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        // 팝업 확인
        Popup popup = popupRepository.findById(reqDto.getPopupId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid popup ID"));

        // 좋아요 확인
//        Heart heart = heartRepository.findByMemberAndPopup(member, popup)
//                .orElseThrow(() -> new Exception("Could not found heart id"));

        popup.setHeart(popup.getHeart()-1);

//        heartRepository.delete(heart);
    }
}
