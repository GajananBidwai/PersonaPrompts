package com.company.travelexpense.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Travel & Expense Management System");
        return response;
    }

    @GetMapping("/api/health")
    public Map<String, String> apiHealthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Travel & Expense Management API");
        response.put("version", "1.0.0");
        return response;
    }
}
