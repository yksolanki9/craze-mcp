import {
  ApprovalAction,
  ApprovalCriteriaExpressionOperator,
  ApprovalCriteriaOperand,
  ApprovalStatus,
  ApprovalType,
  ApproverDefinitionType,
  EmploymentStatus,
  EmploymentType,
  ExpenseType,
  UserStatus,
} from "./enums.js";

export interface UserBasic {
  id: string;
  organization_id: string;
  name: string;
  email: string;
  status: UserStatus;
  has_onboarded: boolean;
  phone_number: string | null;
  basic_employment: {
    id: string;
    status: EmploymentStatus;
    entity_id: string;
    reporting_to_id: string | null;
    current_transition: {
      id: string;
      title: string;
      employment_type: EmploymentType;
      basic_work_location: {
        id: string;
        name: string;
      };
      basic_department: {
        id: string;
        name: string;
      } | null;
      basic_teams: {
        id: string;
        name: string;
      }[];
    };
  } | null;
}

export interface BaseRequest {
  id: string;
  created_at: string;
  modified_at: string;
  approval_record_id: string;
  approval_record: ApprovalRecord;
}

export interface ApprovalChain {
  id: string;
  approval_policy_id: string;
  is_active: boolean;
  auto_approve: boolean;
  auto_restrict: boolean;
  auto_restrict_reason: string | null;
  approval_criteria_id: string | null;
  approval_criteria?: ApprovalCriteria | null;
  approver_definitions?: ApproverDefinition[];
}

export interface ApprovalPolicy {
  id: string;
  organization_id: string;
  rank: number;
  approval_type: keyof typeof ApprovalType;
  name: string;
  is_system_default: boolean;
  approval_chain?: ApprovalChain;
}

export interface ApprovalRecord {
  id: string;
  created_at: string;
  user_id: string;
  user: UserBasic;
  created_by_id: string;
  created_by: UserBasic;
  comment: string | null;
  current_sequence_no: number | null;
  status: ApprovalStatus;
  approval_chain_id: string;
  approval_chain?: ApprovalChain;
  approvals: Approval[];
  closed_at: string | null;
  is_auto_closed: boolean;
  cancelled_by_id: string | null;
  cancelled_by: UserBasic | null;
  cancel_comment: string | null;
}

export interface ApproverDefinition {
  approval_chain_id: string;
  sequence_no: number;
  approver_definition_type: ApproverDefinitionType;
  user_id: string | null;
  reporting_to_level: string | null;
  permission_profile_id: string | null;
  department_id: string | null;
}

export interface ApprovalCriteriaExpression {
  id: string;
  approval_criteria_id: string;
  expression_number: number;
  approval_criteria?: ApprovalCriteria;
  operand_1: ApprovalCriteriaOperand;
  operand_2: string;
  operator: ApprovalCriteriaExpressionOperator;
}

export interface ApprovalCriteria {
  id: string;
  approval_criteria_expressions: ApprovalCriteriaExpression[];
  expression_string: string;
}

export interface Approval {
  approval_record_id: string;
  sequence_no: number;
  user_id: string;
  user: UserBasic;
  action: ApprovalAction;
  is_overridden_by_super_admin: boolean;
  comment: string | null;
  reviewed_at: string;
}

export interface ReimbursementRequest extends BaseRequest {
  pay_statement_id: string | null;
  payment_id: string | null;
  amount: number;
  expense_date: string;
  expense_type: ExpenseType;
}
