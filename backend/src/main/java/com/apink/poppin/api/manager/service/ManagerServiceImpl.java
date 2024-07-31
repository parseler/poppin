package com.apink.poppin.api.manager.service;

import com.apink.poppin.api.manager.dto.ManagerDTO;
import com.apink.poppin.api.manager.entity.Manager;
import com.apink.poppin.api.manager.repository.ManagerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;

    public ManagerServiceImpl(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public void updateManager(Long managerTsid, ManagerDTO managerDTO) {
        Manager manager = managerRepository.findById(managerTsid).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매니저입니다."));
        Manager newManager = Manager.builder()
                .managerTsid(managerTsid)
                .nickname(managerDTO.getNickname() == null ? manager.getNickname() : managerDTO.getNickname())
                .code(managerDTO.getCode() == null ? manager.getCode() : managerDTO.getCode())
                .img(managerDTO.getImg() == null ? manager.getImg() : managerDTO.getImg())
                .build();
        managerRepository.save(newManager);
    }

    @Override
    @Transactional(readOnly = true)
    public void deleteManager(Long managerTsid) {
        managerRepository.deleteById(managerTsid);
    }

    @Override
    public Manager getManager(Long managerTsid) {
        return managerRepository.findById(managerTsid).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매니저입니다."));
    }

    @Override
    public List<Manager> getManagerList() {
        return managerRepository.findAll();
    }

    @Override
    public Boolean checkNickname(String nickname) {
        Manager manager = managerRepository.findByNickname(nickname);
        return manager != null;
    }
}
