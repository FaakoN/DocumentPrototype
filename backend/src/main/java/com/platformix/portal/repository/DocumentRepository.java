package com.platformix.portal.repository;

import com.platformix.portal.entity.Document;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<@NonNull Document,@NonNull Long> {
}
