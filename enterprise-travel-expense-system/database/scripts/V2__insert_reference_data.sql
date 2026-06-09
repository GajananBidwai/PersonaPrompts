-- Enterprise Employee Travel & Expense Management System
-- Reference Data Inserts
-- Version: 1.0.0

USE travel_expense_db;

-- =============================================
-- DEPARTMENTS
-- =============================================
INSERT INTO departments (name, code, description, is_active) VALUES
('Engineering', 'ENG', 'Software development and engineering teams', TRUE),
('Marketing', 'MKT', 'Marketing and brand management', TRUE),
('Sales', 'SAL', 'Sales and business development', TRUE),
('Human Resources', 'HR', 'Human resources and talent management', TRUE),
('Finance', 'FIN', 'Finance and accounting', TRUE),
('Operations', 'OPS', 'Operations and logistics', TRUE),
('Executive', 'EXEC', 'Executive leadership', TRUE),
('Legal', 'LGL', 'Legal and compliance', TRUE);

-- =============================================
-- ROLES
-- =============================================
INSERT INTO roles (name, description, is_system_role) VALUES
('EMPLOYEE', 'Standard employee with basic access', TRUE),
('MANAGER', 'Team manager with approval permissions', TRUE),
('FINANCE', 'Finance team member with reimbursement access', TRUE),
('ADMIN', 'System administrator with full access', TRUE),
('HR_ADMIN', 'HR administrator with employee management access', TRUE),
('TRAVEL_COORDINATOR', 'Travel booking coordinator', TRUE);

-- =============================================
-- TRAVEL REQUEST STATUSES
-- =============================================
INSERT INTO travel_request_statuses (code, name, description, display_order, is_terminal, is_active) VALUES
('DRAFT', 'Draft', 'Request is being prepared but not submitted', 1, FALSE, TRUE),
('SUBMITTED', 'Submitted', 'Request submitted for approval', 2, FALSE, TRUE),
('UNDER_REVIEW', 'Under Review', 'Request is being reviewed by approver', 3, FALSE, TRUE),
('APPROVED', 'Approved', 'Request has been approved', 4, TRUE, TRUE),
('REJECTED', 'Rejected', 'Request has been rejected', 5, TRUE, TRUE),
('CANCELLED', 'Cancelled', 'Request was cancelled by employee', 6, TRUE, TRUE),
('COMPLETED', 'Completed', 'Travel completed and expenses settled', 7, TRUE, TRUE);

-- =============================================
-- BOOKING TYPES
-- =============================================
INSERT INTO booking_types (code, name, description, is_active) VALUES
('FLIGHT', 'Flight', 'Air travel bookings', TRUE),
('TRAIN', 'Train', 'Rail travel bookings', TRUE),
('HOTEL', 'Hotel', 'Hotel accommodation bookings', TRUE),
('CAR_RENTAL', 'Car Rental', 'Vehicle rental bookings', TRUE),
('VISA', 'Visa', 'Visa application processing', TRUE),
('INSURANCE', 'Travel Insurance', 'Travel insurance purchase', TRUE);

-- =============================================
-- EXPENSE CATEGORIES
-- =============================================
INSERT INTO expense_categories (code, name, description, requires_receipt, receipt_threshold, daily_limit, is_active, display_order) VALUES
('FLIGHT', 'Flight', 'Airfare and related fees', TRUE, 0.00, NULL, TRUE, 1),
('ACCOMMODATION', 'Accommodation', 'Hotel and lodging expenses', TRUE, 0.00, 300.00, TRUE, 2),
('MEALS', 'Meals', 'Food and dining expenses', TRUE, 25.00, 75.00, TRUE, 3),
('GROUND_TRANSPORT', 'Ground Transport', 'Taxi, rideshare, public transit', TRUE, 25.00, 50.00, TRUE, 4),
('RENTAL_CAR', 'Rental Car', 'Vehicle rental expenses', TRUE, 0.00, 100.00, TRUE, 5),
('PARKING', 'Parking', 'Parking fees and tolls', TRUE, 10.00, 30.00, TRUE, 6),
('INTERNET', 'Internet', 'WiFi and data charges', TRUE, 10.00, 20.00, TRUE, 7),
('PHONE', 'Phone', 'Business call charges', TRUE, 10.00, 15.00, TRUE, 8),
('INCIDENTALS', 'Incidentals', 'Tips, laundry, other small expenses', TRUE, 10.00, 25.00, TRUE, 9),
('OTHER', 'Other', 'Miscellaneous business expenses', TRUE, 25.00, NULL, TRUE, 10);

-- =============================================
-- EXPENSE POLICIES (Sample policies)
-- =============================================
INSERT INTO expense_policies (category_id, region, max_amount, currency, effective_from, effective_to, description, is_active) VALUES
((SELECT id FROM expense_categories WHERE code = 'MEALS'), 'Domestic', 75.00, 'USD', '2024-01-01', NULL, 'Daily meal allowance for domestic travel', TRUE),
((SELECT id FROM expense_categories WHERE code = 'MEALS'), 'International', 100.00, 'USD', '2024-01-01', NULL, 'Daily meal allowance for international travel', TRUE),
((SELECT id FROM expense_categories WHERE code = 'ACCOMMODATION'), 'Tier 1 Cities', 300.00, 'USD', '2024-01-01', NULL, 'Hotel limit for major cities (NYC, London, Tokyo)', TRUE),
((SELECT id FROM expense_categories WHERE code = 'ACCOMMODATION'), 'Tier 2 Cities', 200.00, 'USD', '2024-01-01', NULL, 'Hotel limit for secondary cities', TRUE),
((SELECT id FROM expense_categories WHERE code = 'ACCOMMODATION'), 'Tier 3 Cities', 150.00, 'USD', '2024-01-01', NULL, 'Hotel limit for other cities', TRUE),
((SELECT id FROM expense_categories WHERE code = 'GROUND_TRANSPORT'), 'All', 50.00, 'USD', '2024-01-01', NULL, 'Daily ground transport limit', TRUE);

-- =============================================
-- REIMBURSEMENT STATUSES
-- =============================================
INSERT INTO reimbursement_statuses (code, name, description, display_order) VALUES
('PENDING_REVIEW', 'Pending Review', 'Reimbursement awaiting finance review', 1),
('APPROVED', 'Approved', 'Reimbursement approved for payment', 2),
('PROCESSING', 'Processing', 'Payment being processed', 3),
('PAID', 'Paid', 'Payment completed', 4),
('REJECTED', 'Rejected', 'Reimbursement rejected', 5),
('ON_HOLD', 'On Hold', 'Reimbursement on hold pending information', 6);

-- =============================================
-- NOTIFICATION TYPES
-- =============================================
INSERT INTO notification_types (code, name, description, template_subject, template_body, default_priority, is_active) VALUES
('TRAVEL_REQUEST_SUBMITTED', 'Travel Request Submitted', 'Employee submitted a new travel request', 'New Travel Request: {{requestNumber}}', 'Dear {{approverName}},\n\n{{employeeName}} has submitted travel request {{requestNumber}} for {{destination}} from {{startDate}} to {{endDate}}.\n\nEstimated budget: {{estimatedBudget}}\n\nPlease review at: {{approvalLink}}\n\nBest regards,\nTravel & Expense System', 'NORMAL', TRUE),
('TRAVEL_REQUEST_APPROVED', 'Travel Request Approved', 'Travel request was approved', 'Travel Request Approved: {{requestNumber}}', 'Dear {{employeeName}},\n\nYour travel request {{requestNumber}} for {{destination}} has been approved.\n\nYou may now proceed with bookings.\n\nBest regards,\nTravel & Expense System', 'NORMAL', TRUE),
('TRAVEL_REQUEST_REJECTED', 'Travel Request Rejected', 'Travel request was rejected', 'Travel Request Rejected: {{requestNumber}}', 'Dear {{employeeName}},\n\nYour travel request {{requestNumber}} for {{destination}} has been rejected.\n\nReason: {{rejectionReason}}\n\nYou may modify and resubmit if needed.\n\nBest regards,\nTravel & Expense System', 'HIGH', TRUE),
('APPROVAL_REQUIRED', 'Approval Required', 'Manager has a pending approval', 'Action Required: Approve Travel Request {{requestNumber}}', 'Dear {{approverName}},\n\nYou have a pending approval for travel request {{requestNumber}} from {{employeeName}}.\n\nDestination: {{destination}}\nDates: {{startDate}} to {{endDate}}\nBudget: {{estimatedBudget}}\n\nPlease review at: {{approvalLink}}\n\nBest regards,\nTravel & Expense System', 'HIGH', TRUE),
('APPROVAL_REMINDER', 'Approval Reminder', 'Reminder for pending approval', 'Reminder: Pending Approval for {{requestNumber}}', 'Dear {{approverName}},\n\nThis is a reminder that travel request {{requestNumber}} from {{employeeName}} has been pending for {{daysPending}} days.\n\nPlease review at: {{approvalLink}}\n\nBest regards,\nTravel & Expense System', 'HIGH', TRUE),
('EXPENSE_CLAIM_SUBMITTED', 'Expense Claim Submitted', 'Employee submitted an expense claim', 'New Expense Claim: {{claimNumber}}', 'Dear {{approverName}},\n\n{{employeeName}} has submitted expense claim {{claimNumber}} for {{amount}}.\n\nCategory: {{category}}\nDate: {{expenseDate}}\n\nPlease review at: {{reviewLink}}\n\nBest regards,\nTravel & Expense System', 'NORMAL', TRUE),
('EXPENSE_CLAIM_APPROVED', 'Expense Claim Approved', 'Expense claim was approved', 'Expense Claim Approved: {{claimNumber}}', 'Dear {{employeeName}},\n\nYour expense claim {{claimNumber}} for {{amount}} has been approved.\n\nBest regards,\nTravel & Expense System', 'NORMAL', TRUE),
('EXPENSE_CLAIM_REJECTED', 'Expense Claim Rejected', 'Expense claim was rejected', 'Expense Claim Rejected: {{claimNumber}}', 'Dear {{employeeName}},\n\nYour expense claim {{claimNumber}} for {{amount}} has been rejected.\n\nReason: {{rejectionReason}}\n\nYou may modify and resubmit if needed.\n\nBest regards,\nTravel & Expense System', 'HIGH', TRUE),
('REIMBURSEMENT_PROCESSED', 'Reimbursement Processed', 'Reimbursement payment processed', 'Reimbursement Processed: {{reimbursementNumber}}', 'Dear {{employeeName}},\n\nYour reimbursement {{reimbursementNumber}} for {{totalAmount}} has been processed and paid.\n\nPayment reference: {{paymentReference}}\nPayment date: {{paymentDate}}\n\nBest regards,\nTravel & Expense System', 'NORMAL', TRUE),
('REIMBURSEMENT_REJECTED', 'Reimbursement Rejected', 'Reimbursement was rejected', 'Reimbursement Rejected: {{reimbursementNumber}}', 'Dear {{employeeName}},\n\nYour reimbursement {{reimbursementNumber}} has been rejected.\n\nReason: {{rejectionReason}}\n\nPlease contact finance for details.\n\nBest regards,\nTravel & Expense System', 'HIGH', TRUE);

-- =============================================
-- APPROVAL LEVELS (Default configuration)
-- =============================================
INSERT INTO approval_levels (name, description, level_order, approver_type, min_amount, max_amount, is_active) VALUES
('Manager Approval', 'Direct manager approval required', 1, 'MANAGER', 0.00, 5000.00, TRUE),
('Department Head Approval', 'Department head approval for higher amounts', 2, 'ROLE_BASED', 5000.01, 20000.00, TRUE),
('Finance Approval', 'Finance team approval for high-value requests', 3, 'ROLE_BASED', 20000.01, NULL, TRUE);

-- Update role_id for role-based approval levels
UPDATE approval_levels SET role_id = (SELECT id FROM roles WHERE name = 'MANAGER') WHERE level_order = 2;
UPDATE approval_levels SET role_id = (SELECT id FROM roles WHERE name = 'FINANCE') WHERE level_order = 3;
