package com.apink.poppin.api.manager.service;

import com.apink.poppin.api.manager.dto.ManagerDTO;
import com.apink.poppin.api.manager.entity.Manager;

import java.util.List;

public interface ManagerService {
    // TODO>: 관리지가 매니저 생성 페이지 존재시 구현
//    ManagerResponseDTO createManager(ManagerDTO managerDTO);
    void updateManager(Long managerTsid, ManagerDTO managerDTO);
    void deleteManager(Long managerTsid);
    Manager getManager(Long managerTsid);
    List<Manager> getManagerList();
    Boolean checkNickname(String nickname);
}
