package com.apink.poppin.api.manager.controller;

import com.apink.poppin.api.manager.dto.*;
import com.apink.poppin.api.manager.entity.Manager;
import com.apink.poppin.api.manager.service.ManagerService;
import com.apink.poppin.api.popup.service.PopupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/managers")
public class ManagerController {

    private final ManagerService managerService;
    private final PopupService  popupService;

    //TODO: Admin 권한 확인 후 매니저 전체 조회
    @GetMapping("/")
    ResponseEntity<?> getManagers() {
        List<Manager> managerList = managerService.getManagerList();
        List<ManagerListDTO> result = new ArrayList<>();
        for (Manager manager : managerList) {
            result.add(ManagerListDTO.builder()
                    .managerTsid(manager.getManagerTsid())
                    .nickname(manager.getNickname())
                    .img(manager.getImg())
                    .build());
        }
        return ResponseEntity.ok(result);
    }

    //TODO: JWT 토큰을 통한 조회 @PathVarialbe => @ManagerTsid
    @GetMapping("/me")
    ResponseEntity<?> getMyInfo(@PathVariable Long managerTsid) {
        Manager reponse = managerService.getManager(managerTsid);
        return ResponseEntity.ok(ReadManagerResponseDTO.builder()
                .managerTsid(reponse.getManagerTsid())
                .nickname(reponse.getNickname())
                .img(reponse.getImg())
                .build());
    }

    //TODO: 위와 같은 JWT 토큰을 통한 조회 @PathVarialbe => @ManagerTsid
    @GetMapping("/me/popups")
    ResponseEntity<?> getMyPopups(@PathVariable Long managerTsid) {
        //TODO: popupService findByID 구현
//        popupService.getById(managerTsid);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{nickname}/check")
    ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        Boolean exist = managerService.checkNickname(nickname);
        return ResponseEntity.ok(exist);
    }

    @GetMapping("/{managerTsid}")
    ResponseEntity<?> getManager(@PathVariable Long managerTsid) {
        Manager manager =  managerService.getManager(managerTsid);
        return ResponseEntity.ok(ReadManagerResponseDTO.builder()
                .managerTsid(manager.getManagerTsid())
                .nickname(manager.getNickname())
                .img(manager.getImg())
                .build());
    }

    @PutMapping("/{managerTsid}")
    ResponseEntity<?> updateManager(@PathVariable Long managerTsid, @RequestBody UpdateManagerRequestDTO request) {
        managerService.updateManager(managerTsid, ManagerDTO.builder()
                .nickname(request.getNickname())
                .code(request.getCode())
                .img(request.getImg())
                .build());
        Manager manager = managerService.getManager(managerTsid);
        UpdateManagerResponseDTO response = UpdateManagerResponseDTO.builder()
                .managerTsid(manager.getManagerTsid())
                .build();
        return ResponseEntity.ok(response);
    }

    //TODO: Admin 권한 확인 후 매니저 삭제
    @DeleteMapping("/{managerTsid}")
    ResponseEntity<?> deleteManager(@PathVariable Long managerTsid) {
        managerService.deleteManager(managerTsid);
        return ResponseEntity.ok().build();
    }
}
