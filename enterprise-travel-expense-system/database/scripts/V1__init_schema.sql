-- Enterprise Employee Travel & Expense Management System
-- Initial Database Schema
-- Version: 1.0.0

-- Create database
CREATE DATABASE IF NOT EXISTS travel_expense_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travel_expense_db;

-- =============================================
-- EMPLOYEE MANAGEMENT TABLES
-- =============================================

-- Departments table
CREATE TABLE departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    parent_department_id BIGINT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Employees table
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    date_of_birth DATE,
    hire_date DATE,
    department_id BIGINT,
    position VARCHAR(100),
    manager_id BIGINT,
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_employee_email (email),
    INDEX idx_employee_department (department_id),
    INDEX idx_employee_manager (manager_id)
);

-- Roles table
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee roles (many-to-many)
CREATE TABLE employee_roles (
    employee_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by BIGINT,
    PRIMARY KEY (employee_id, role_id),
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES employees(id) ON DELETE SET NULL
);

-- User accounts (for authentication)
CREATE TABLE user_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP NULL,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    password_changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    must_change_password BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_user_accounts_username (username)
);

-- Sessions table
CREATE TABLE user_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_account_id BIGINT NOT NULL,
    session_token VARCHAR(500) NOT NULL UNIQUE,
    refresh_token VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP NULL,
    FOREIGN KEY (user_account_id) REFERENCES user_accounts(id) ON DELETE CASCADE,
    INDEX idx_sessions_token (session_token),
    INDEX idx_sessions_user (user_account_id),
    INDEX idx_sessions_expires (expires_at)
);

-- =============================================
-- TRAVEL REQUEST TABLES
-- =============================================

-- Travel request statuses
CREATE TABLE travel_request_statuses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_terminal BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Travel requests
CREATE TABLE travel_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_number VARCHAR(30) NOT NULL UNIQUE,
    employee_id BIGINT NOT NULL,
    destination VARCHAR(500) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    estimated_budget DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status_id BIGINT NOT NULL DEFAULT 1,
    submitted_at TIMESTAMP NULL,
    approved_at TIMESTAMP NULL,
    rejected_at TIMESTAMP NULL,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES travel_request_statuses(id),
    INDEX idx_travel_requests_employee (employee_id),
    INDEX idx_travel_requests_status (status_id),
    INDEX idx_travel_requests_dates (start_date, end_date),
    INDEX idx_travel_requests_number (request_number)
);

-- Travel request drafts (auto-save)
CREATE TABLE travel_request_drafts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    travel_request_id BIGINT,
    employee_id BIGINT NOT NULL,
    draft_data JSON NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_employee_draft (employee_id, travel_request_id)
);

-- =============================================
-- APPROVAL WORKFLOW TABLES
-- =============================================

-- Approval levels configuration
CREATE TABLE approval_levels (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    level_order INT NOT NULL,
    approver_type ENUM('MANAGER', 'SPECIFIC_USER', 'ROLE_BASED') NOT NULL,
    approver_id BIGINT,
    role_id BIGINT,
    department_id BIGINT,
    min_amount DECIMAL(15,2),
    max_amount DECIMAL(15,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (approver_id) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Approval workflows
CREATE TABLE approval_workflows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    travel_request_id BIGINT NOT NULL,
    current_level INT DEFAULT 1,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') DEFAULT 'PENDING',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE CASCADE,
    INDEX idx_approval_workflows_request (travel_request_id)
);

-- Approval steps
CREATE TABLE approval_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workflow_id BIGINT NOT NULL,
    level_id BIGINT NOT NULL,
    step_order INT NOT NULL,
    assigned_to BIGINT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'SKIPPED') DEFAULT 'PENDING',
    comments TEXT,
    action_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES approval_workflows(id) ON DELETE CASCADE,
    FOREIGN KEY (level_id) REFERENCES approval_levels(id),
    FOREIGN KEY (assigned_to) REFERENCES employees(id) ON DELETE SET NULL,
    UNIQUE KEY unique_workflow_level (workflow_id, level_id)
);

-- Approval comments/history
CREATE TABLE approval_comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    step_id BIGINT NOT NULL,
    commenter_id BIGINT NOT NULL,
    comment TEXT NOT NULL,
    is_system_comment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (step_id) REFERENCES approval_steps(id) ON DELETE CASCADE,
    FOREIGN KEY (commenter_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- =============================================
-- TRAVEL BOOKING TABLES
-- =============================================

-- Booking types
CREATE TABLE booking_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Travel bookings
CREATE TABLE travel_bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_reference VARCHAR(50) UNIQUE,
    travel_request_id BIGINT NOT NULL,
    booking_type_id BIGINT NOT NULL,
    provider VARCHAR(200),
    provider_reference VARCHAR(100),
    departure_location VARCHAR(500),
    arrival_location VARCHAR(500),
    departure_datetime DATETIME,
    arrival_datetime DATETIME,
    details JSON,
    cost DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('REQUESTED', 'CONFIRMED', 'CANCELLED', 'MODIFIED') DEFAULT 'REQUESTED',
    booked_at TIMESTAMP NULL,
    confirmed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_type_id) REFERENCES booking_types(id),
    INDEX idx_travel_bookings_request (travel_request_id),
    INDEX idx_travel_bookings_status (status)
);

-- =============================================
-- EXPENSE CLAIM TABLES
-- =============================================

-- Expense categories
CREATE TABLE expense_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    requires_receipt BOOLEAN DEFAULT TRUE,
    receipt_threshold DECIMAL(10,2) DEFAULT 25.00,
    daily_limit DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0
);

-- Expense policies
CREATE TABLE expense_policies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    region VARCHAR(100),
    max_amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    effective_from DATE NOT NULL,
    effective_to DATE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES expense_categories(id) ON DELETE CASCADE
);

-- Expense claims
CREATE TABLE expense_claims (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    claim_number VARCHAR(30) NOT NULL UNIQUE,
    employee_id BIGINT NOT NULL,
    travel_request_id BIGINT,
    category_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    expense_date DATE NOT NULL,
    description TEXT,
    receipt_path VARCHAR(500),
    receipt_filename VARCHAR(255),
    receipt_mime_type VARCHAR(100),
    receipt_size BIGINT,
    status ENUM('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PAID') DEFAULT 'DRAFT',
    policy_violations JSON,
    submitted_at TIMESTAMP NULL,
    reviewed_at TIMESTAMP NULL,
    reviewed_by BIGINT,
    review_comments TEXT,
    approved_at TIMESTAMP NULL,
    approved_by BIGINT,
    rejected_at TIMESTAMP NULL,
    rejected_by BIGINT,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES expense_categories(id),
    FOREIGN KEY (reviewed_by) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (rejected_by) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_expense_claims_employee (employee_id),
    INDEX idx_expense_claims_status (status),
    INDEX idx_expense_claims_date (expense_date),
    INDEX idx_expense_claims_number (claim_number)
);

-- =============================================
-- REIMBURSEMENT TABLES
-- =============================================

-- Reimbursement statuses
CREATE TABLE reimbursement_statuses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0
);

-- Reimbursements
CREATE TABLE reimbursements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reimbursement_number VARCHAR(30) NOT NULL UNIQUE,
    employee_id BIGINT NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status_id BIGINT NOT NULL DEFAULT 1,
    payment_method ENUM('BANK_TRANSFER', 'CHECK', 'PAYROLL', 'OTHER') DEFAULT 'BANK_TRANSFER',
    payment_reference VARCHAR(100),
    bank_account_last4 VARCHAR(4),
    processed_at TIMESTAMP NULL,
    processed_by BIGINT,
    paid_at TIMESTAMP NULL,
    paid_by BIGINT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES reimbursement_statuses(id),
    FOREIGN KEY (processed_by) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (paid_by) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_reimbursements_employee (employee_id),
    INDEX idx_reimbursements_status (status_id),
    INDEX idx_reimbursements_number (reimbursement_number)
);

-- Reimbursement items (linking expense claims to reimbursements)
CREATE TABLE reimbursement_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reimbursement_id BIGINT NOT NULL,
    expense_claim_id BIGINT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reimbursement_id) REFERENCES reimbursements(id) ON DELETE CASCADE,
    FOREIGN KEY (expense_claim_id) REFERENCES expense_claims(id) ON DELETE CASCADE,
    UNIQUE KEY unique_reimbursement_expense (reimbursement_id, expense_claim_id)
);

-- =============================================
-- NOTIFICATION TABLES
-- =============================================

-- Notification types
CREATE TABLE notification_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    template_subject VARCHAR(255),
    template_body TEXT,
    default_priority ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') DEFAULT 'NORMAL',
    is_active BOOLEAN DEFAULT TRUE
);

-- Notifications
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_id BIGINT NOT NULL,
    recipient_id BIGINT NOT NULL,
    sender_id BIGINT,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    reference_type VARCHAR(50),
    reference_id BIGINT,
    priority ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') DEFAULT 'NORMAL',
    channels JSON DEFAULT ('["IN_APP"]'),
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP NULL,
    push_sent BOOLEAN DEFAULT FALSE,
    push_sent_at TIMESTAMP NULL,
    read_at TIMESTAMP NULL,
    archived_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES notification_types(id),
    FOREIGN KEY (recipient_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_notifications_recipient (recipient_id),
    INDEX idx_notifications_read (read_at),
    INDEX idx_notifications_reference (reference_type, reference_id)
);

-- =============================================
-- AUDIT LOG TABLES
-- =============================================

-- Audit logs
CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    action VARCHAR(50) NOT NULL,
    actor_id BIGINT,
    actor_ip VARCHAR(45),
    actor_user_agent TEXT,
    old_values JSON,
    new_values JSON,
    changed_fields JSON,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_id) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_audit_logs_entity (entity_type, entity_id),
    INDEX idx_audit_logs_actor (actor_id),
    INDEX idx_audit_logs_created (created_at)
);

-- =============================================
-- REPORTING VIEWS
-- =============================================

-- Travel summary view
CREATE VIEW v_travel_summary AS
SELECT 
    tr.id,
    tr.request_number,
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    e.department_id,
    d.name AS department_name,
    tr.destination,
    tr.purpose,
    tr.start_date,
    tr.end_date,
    tr.estimated_budget,
    tr.currency,
    tr.status_id,
    trs.name AS status_name,
    tr.submitted_at,
    tr.approved_at,
    tr.created_at
FROM travel_requests tr
JOIN employees e ON tr.employee_id = e.id
LEFT JOIN departments d ON e.department_id = d.id
JOIN travel_request_statuses trs ON tr.status_id = trs.id;

-- Expense summary view
CREATE VIEW v_expense_summary AS
SELECT 
    ec.id,
    ec.claim_number,
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    e.department_id,
    d.name AS department_name,
    ec.category_id,
    cat.name AS category_name,
    ec.amount,
    ec.currency,
    ec.expense_date,
    ec.status,
    ec.submitted_at,
    ec.approved_at,
    ec.created_at
FROM expense_claims ec
JOIN employees e ON ec.employee_id = e.id
LEFT JOIN departments d ON e.department_id = d.id
JOIN expense_categories cat ON ec.category_id = cat.id;

-- Reimbursement summary view
CREATE VIEW v_reimbursement_summary AS
SELECT 
    r.id,
    r.reimbursement_number,
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    e.department_id,
    d.name AS department_name,
    r.total_amount,
    r.currency,
    r.status_id,
    rs.name AS status_name,
    r.processed_at,
    r.paid_at,
    r.created_at
FROM reimbursements r
JOIN employees e ON r.employee_id = e.id
LEFT JOIN departments d ON e.department_id = d.id
JOIN reimbursement_statuses rs ON r.status_id = rs.id;
