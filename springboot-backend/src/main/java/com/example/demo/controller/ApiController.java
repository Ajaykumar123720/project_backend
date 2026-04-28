package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    // ✅ MUST NOT be required=false
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // ===========================
    // ✅ REGISTER API (WORKING)
    // ===========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            String id = UUID.randomUUID().toString();

            int rows = jdbcTemplate.update(
                    "INSERT INTO users (`id`, `full_name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?, ?)",
                    id,
                    req.fullName(),
                    req.email(),
                    req.password(),
                    req.role()
            );

            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully",
                    "rows", rows
            ));

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 IMPORTANT
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ===========================
    // ✅ LOGIN API (DB BASED)
    // ===========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            List<Map<String, Object>> users = jdbcTemplate.queryForList(
                    "SELECT * FROM users WHERE email = ? AND password = ?",
                    req.email(),
                    req.password()
            );

            if (users.isEmpty()) {
                return ResponseEntity.status(401)
                        .body(Map.of("error", "Invalid credentials"));
            }

            return ResponseEntity.ok(Map.of("user", users.get(0)));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ===========================
    // ✅ GET USERS
    // ===========================
    @GetMapping("/users")
    public List<Map<String, Object>> getUsers() {
        return jdbcTemplate.queryForList("SELECT * FROM users");
    }
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
    @GetMapping("/funds")
    public List<Map<String, Object>> getFunds() {
        return jdbcTemplate.queryForList(
            "SELECT id, name, category FROM funds"
        );
    }
    // ✅ DTO RECORDS
    // ===========================
    public record RegisterRequest(
            String fullName,
            String email,
            String password,
            String role
    ) {}

    public record LoginRequest(
    		
            String email,
            String password
    ) {}
}