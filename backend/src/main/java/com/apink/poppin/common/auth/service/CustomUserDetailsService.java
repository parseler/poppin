//package com.apink.poppin.common.auth.service;
//
//import com.apink.poppin.api.manager.dto.ManagerDto;
//import com.apink.poppin.api.manager.entity.Manager;
//import com.apink.poppin.api.manager.repository.ManagerRepository;
//import com.apink.poppin.common.auth.dto.CustomUserDetails;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final ManagerRepository managerRepository;
//
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Manager manager = managerRepository.findManagerByManagerId(username);
//        ManagerDto.AuthManager managerData = ManagerDto.AuthManager.builder()
//                .managerTsid(manager.getManagerTsid())
//                .managerId(manager.getManagerId())
//                .password(manager.getPassword())
//                .build();
//
//        if(managerData != null) {
//            return new CustomUserDetails(managerData);
//        }
//
//        return null;
//    }
//}
