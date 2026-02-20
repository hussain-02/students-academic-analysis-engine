package com.saae.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.saae.model.User;
import com.saae.repository.UserRepository;

@Controller
@RequestMapping("/setup")
public class DatabaseSetupController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public String setupPage() {
        return "setup";
    }

    @PostMapping("/hash-passwords")
    @ResponseBody
    public Map<String, Object> hashAllPasswords() {
        Map<String, Object> response = new HashMap<>();

        try {
            // 1. Create or Update default users with user-specific passwords
            createOrUpdateDefaultUser("admin", "admin123", "ADMIN", "System Administrator", "admin@saae.com");
            createOrUpdateDefaultUser("faculty", "faculty123", "FACULTY", "Faculty User", "faculty@saae.com");
            createOrUpdateDefaultUser("student", "student123", "STUDENT", "Student User", "student@saae.com");

            // 2. Hash any plain-text passwords
            List<User> users = userRepository.findAll();
            int hashUpdatedCount = 0;

            for (User user : users) {
                String pwd = user.getPassword();
                // If password is plain text (not starting with $2a$, $2b$, $2y$)
                if (pwd != null && !pwd.startsWith("$2a$") && !pwd.startsWith("$2b$") && !pwd.startsWith("$2y$")) {
                    user.setPassword(passwordEncoder.encode(pwd));
                    userRepository.save(user);
                    hashUpdatedCount++;
                }
            }

            response.put("success", true);
            response.put("message",
                    "System Initialized! Admin/admin123, Faculty/faculty123, Student/student123 are ready. "
                            + hashUpdatedCount + " passwords hashed.");
            response.put("totalUsers", users.size());

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error during setup: " + e.getMessage());
        }

        return response;
    }

    private void createOrUpdateDefaultUser(String username, String password, String role, String fullName,
            String email) {
        Optional<User> existing = userRepository.findByUsername(username);
        User user;
        if (existing.isPresent()) {
            user = existing.get();
        } else {
            user = new User();
            user.setUsername(username);
        }

        // Always set the requested password (as plain text first, the loop will hash
        // it)
        // This ensures the passwords match what the user wants: admin123, etc.
        user.setPassword(password);
        user.setRole(role);
        user.setFullName(fullName);
        user.setEmail(email);
        userRepository.save(user);
    }
}
