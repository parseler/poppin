package com.apink.poppin.api.manager.service;

public interface ManagerService {
    ManagerResponseDTO createManager(ManagerDTO managerDTO);
    ManagerResponseDTO updateManager(ManagerDTO managerDTO);
    void deleteManager(Long managerTsid);
    ManagerResponseDTO getManager(Long managerTsid);
    List<ManagerListDTO> getManagerList();
    Boolean checkNickname(String nickname);
}
