import { AirIndiaDL } from './airindia';

export interface FormCompleteAIDL extends AirIndiaDL {
  form: {
    clickName?: string;
    employeeId?: string;
    attachmentId?: string;
    formName?: string;
    typeOfQuery?: string;
    region?: string;
    department?: string;
    categoryName?: string;
    impact?: string;
    urgency?: string;
    requestedFor?: string;
    dateOfTravel?: string;

    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    timeOffPriority?: string;
    purpose?: string;
    selectedMonth?: string;
    selectedYear?: string;
    qualificationType?: string;
    specialization?: string;
    modeOfEducation?: string;
    highestEducation?: string;
    application?: string;
    operations?: string;

    /* Travel Query Form Values */
    u_requested_for?: string;
    employeeID?: string;
    emailID?: string;
    designation?: string;
    location_hr?: string;
    business_service?: string;
    u_type_of_query?: string;
    countryCode?: string;
    u_mobile_number?: string;
    u_function_department?: string;
    u_region?: string;
    short_description?: string;
    u_date_of_travel?: string;
    description?: string;

    /* New incident Request form */
    caller_id?: string;
    u_error_message_if_any?: string;
    u_flight_s_date_port_affected?: string;
    u_flight_s_date_port?: string;
    u_error_report_id?: string;
    u_timestamp_gmt?: string;
    u_what_is_the_exact_error_issue_encountered?: string;
    u_expected_vs_actual_results?: string;
    u_requester_organisation_subsidiary?: string;
    u_jfe_version?: string;
    requested_for?: string;

    /* IT service request */
    requested_by?: string;
    additional_information?: string;
    business_it_group?: string;
    countrycode?: string;
    mobile_number?: string;
    category?: string;
    title?: string;
    u_emp_id?: string;
    u_email_id?: string;
    file?: string;
    file_name?: string;

    /* Add/Edit experience form */
    experienceId?: string;
    employeeCode?: string;
    company?: string;
    natureOfBusiness?: string;
    positionHeld?: string;
    companyAddress?: string;
    ctc?: string;

    /* Add/Edit Education form */
    qualificationName?: string;
    school?: string;
    location?: string;
    grade?: string;
    rollNumber?: string;

    /* Leave module form values */
    email?: string;
    leaveId?: string;
    leaveReason?: string;
    leaveCode?: string;
    leaveType?: string;
    returningToWorkDate?: string;
    fractionQuantity?: string;
    dateOfDelivery?: string;
    employeeChildAge?: string;
    dateOfRelocation?: string;
    expectedDateOfDelivery?: string;
    newAttachmentId?: string;
    duration?: string;
    prevAttachmentId?: string;
    leaveBalance?: string;

    /* MISC */
    comment?: string;
    rating?: string;
    userId?: string;
  };
}
