package com.saae.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saae.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser_Id(Long userId);

    Optional<Student> findByRollNumber(String rollNumber);
}
