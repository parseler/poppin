package com.apink.poppin.api.manager.service;

import com.apink.poppin.api.manager.dto.ManagerDTO;
import com.apink.poppin.api.manager.entity.Manager;
import com.apink.poppin.api.manager.repository.ManagerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {

    private final ManagerRepository managerRepository;

    public ManagerServiceImpl(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @Override
    public void updateManager(Long managerTsid, ManagerDTO managerDTO) {
        Manager manager = managerRepository.findById(managerTsid).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매니저입니다."));
        manager.setNickname(managerDTO.getNickname());
        manager.setCode(managerDTO.getCode());
        manager.setImg(managerDTO.getImg());
        managerRepository.save(manager);
    }

    @Override
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
