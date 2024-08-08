package com.apink.poppin.api.popup.repository;

import com.apink.poppin.api.popup.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
