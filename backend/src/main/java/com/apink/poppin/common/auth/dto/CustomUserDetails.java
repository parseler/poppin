package com.apink.poppin.common.auth.dto;

import com.apink.poppin.api.manager.dto.ManagerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final ManagerDto.AuthManager manager;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return "ROLE_MANAGER";
            }
        });

        return collection;
    }

    @Override
    public String getPassword() {
        return manager.getPassword();
    }

    @Override
    public String getUsername() {
        return manager.getManagerId();
    }

    public long getUserTsid() {
        return manager.getManagerTsid();
    }
}
