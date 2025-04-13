export enum ApprovalAction {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
}

export enum ExpenseType {
  TRAVEL = "TRAVEL",
  HOTEL = "HOTEL",
  FOOD = "FOOD",
  FUEL = "FUEL",
  TELEPHONE = "TELEPHONE",
  MEDICAL = "MEDICAL",
  OTHER = "OTHER",
}

export enum ApprovalType {
  REIMBURSEMENT = "REIMBURSEMENT",
  FLEXI_BENEFIT = "FLEXI_BENEFIT",
  CONTRACTOR_INVOICE = "CONTRACTOR_INVOICE",
  LEAVE = "LEAVE",
  COMP_OFF = "COMP_OFF",
  REGULARIZATION = "REGULARIZATION",
  LOAN = "LOAN",
}

export enum ApproverDefinitionType {
  USER = "USER",
  REPORTING_TO = "REPORTING_TO",
  PERMISSION_PROFILE = "PERMISSION_PROFILE",
  DEPARTMENT_MEMBERS = "DEPARTMENT_MEMBERS",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum ApprovalCriteriaOperand {
  //User
  USER_ID = "user.id",
  USER_PERMISSION_PROFILE_ID = "user.permission_profile_id",
  //Created By
  CREATED_BY_ID = "created_by.id",
  CREATED_BY_PERMISSION_PROFILE_ID = "created_by.permission_profile_id",
  //Employment
  EMPLOYMENT_TYPE = "employment.employment_type",
  EMPLOYMENT_PROBATION_STATUS = "employment.probation_status",
  EMPLOYMENT_NOTICE_STATUS = "employment.notice_status",
  JOINING_DATE = "employment.joining_date",
  WORK_LOCATION_ID = "employment.work_location_id",
  DEPARTMENT_ID = "employment.department_id",
  TEAM_ID = "employment.team_id",
  TRACK_ID = "employment.track_id",
  LEVEL_ID = "employment.level_id",
  EMPLOYMENT_REPORTING_TO_ID = "employment.reporting_to_id",
  //Reimbursement Request
  REIMBURSEMENT_AMOUNT = "reimbursement.amount",
  REIMBURSEMENT_EXPENSE_TYPE = "reimbursement.expense_type",
  //Flexi Benefit Request
  FLEXI_BENEFIT_AMOUNT = "flexi_benefit.amount",
  FLEXI_BENEFIT_NAME = "flexi_benefit.name",
  //Loan Request
  LOAN_TYPE_ID = "loan.loan_type_id",
  LOAN_PRINCIPAL = "loan.principal",
  LOAN_EMI_TENURE = "loan.emi_tenure_months",
  //Contractor Invoice
  CONTRACTOR_INVOICE_AMOUNT = "contractor_invoice.amount",
  //Leave Request
  LEAVE_TYPE = "leave.leave_type_id",
  LEAVE_POLICY_ID = "leave.leave_policy_id",
  LEAVE_DAYS = "leave.leave_days",
  LEAVE_ADVANCE_DAYS = "leave.advance_days",
  LEAVE_START_DATE = "leave.start_date",
  LEAVE_END_DATE = "leave.end_date",
  //Attendance Regularization
  REGULARIZATION_DAYS_AFTER = "regularization.days_after",
  //Comp Off
  COMP_OFF_LEAVE_TYPE = "comp_off.leave_type_id",
  COMP_OFF_LEAVE_POLICY_ID = "comp_off.leave_policy_id",
  COMP_OFF_DAYS_AFTER = "comp_off.days_after",
  COMP_OFF_DAYS_BEFORE = "comp_off.days_before",
}

export enum ApprovalCriteriaExpressionOperator {
  //String, Number and Date operators
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  //Number operators
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUALS = "GREATER_THAN_OR_EQUALS",
  LESS_THAN_OR_EQUALS = "LESS_THAN_OR_EQUALS",
  //Date operators
  BEFORE = "BEFORE",
  AFTER = "AFTER",
  ON_OR_BEFORE = "ON_OR_BEFORE",
  ON_OR_AFTER = "ON_OR_AFTER",
}

export enum ApprovalCriteriaOperator {
  AND = "AND",
  OR = "OR",
}

export enum ApprovalCriteriaOperandType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export enum ApprovalCriteriaOperandGroup {
  USER = "USER",
  EMPLOYMENT = "EMPLOYMENT",
  REQUEST = "REQUEST",
  REIMBURSEMENT = "REIMBURSEMENT",
  FLEXI_BENEFIT = "FLEXI_BENEFIT",
  CONTRACTOR_INVOICE = "CONTRACTOR_INVOICE",
  LEAVE = "LEAVE",
  REGULARIZATION = "REGULARIZATION",
  COMP_OFF = "COMP_OFF",
  LOAN = "LOAN",
}

export enum UserStatus {
  CREATED = "CREATED",
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
}

export enum EmploymentStatus {
  CREATED = "Created",
  ACCEPTANCE_PENDING = "Acceptance Pending",
  PRE_ACTIVE = "Pre-active",
  ACTIVE = "Active",
  TERMINATED = "Terminated",
  CANCELLED = "Cancelled",
}

export enum EmploymentType {
  EMPLOYEE_FT = "Salaried Employee",
  CONTRACTOR = "Contractor",
}
