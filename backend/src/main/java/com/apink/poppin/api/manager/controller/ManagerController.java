package com.apink.poppin.api.manager.controller;

import com.apink.poppin.api.manager.service.ManagerService;
import com.apink.poppin.api.popup.dto.PopupDTO;
import com.apink.poppin.api.popup.service.PopupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/managers")
public class ManagerController {

    private final ManagerService managerService;
    private final PopupService  popupService;

    //TODO: Admin 권한 확인 후 매니저 전체 조회
    @GetMapping("/")
    ResponseEntity<?> getManagers() {
        List<ManagerListDTO> managerList = managerService.getManagerList();
        return ResponseEntity.ok(managerList);
    }

    //TODO: JWT 토큰을 통한 조회 @PathVarialbe => @ManagerTsid
    @GetMapping("/me")
    ResponseEntity<?> getMyInfo(@PathVariable Long managerTsid) {
        ManagerResponseDTO manager = managerService.getManager(managerTsid);
        return ResponseEntity.ok(manager);
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
        ManagerResponseDTO manager =  managerService.getManager(managerTsid);
        return ResponseEntity.ok(manager);
    }

    @PutMapping("/{managerTsid}")
    ResponseEntity<?> updateManager(@PathVariable Long managerTsid, @RequestBody ManagerDTO managerDTO) {
        managerDTO.setManagerTsid(managerTsid);
        ManagerResponseDTO manager = managerService.updateManager(managerDTO);
        return ResponseEntity.ok(manager);
    }

    //TODO: Admin 권한 확인 후 매니저 삭제
    @DeleteMapping("/{managerTsid}")
    ResponseEntity<?> deleteManager(@PathVariable Long managerTsid) {
        managerService.deleteManager(managerTsid);
        return ResponseEntity.ok().build();
    }
}
