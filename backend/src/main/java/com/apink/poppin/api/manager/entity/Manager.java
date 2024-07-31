package com.apink.poppin.api.manager.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Entity
@Table(name = "manager")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_tsid", nullable = false)
    private Long managerTsid;

    @Size(max = 50)
    @Column(name = "nickname", length = 50)
    private String nickname;

    @Size(max = 50)
    @Column(name = "code", length = 50)
    private String code;

    @Size(max = 255)
    @Column(name = "img")
    private String img;
}