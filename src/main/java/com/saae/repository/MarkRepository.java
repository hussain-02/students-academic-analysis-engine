package com.saae.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saae.model.Mark;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findByStudent_Id(Long studentId);

    List<Mark> findBySubject_Id(Long subjectId);
}
