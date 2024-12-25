export const newLeaveRequestJson = {
  leaveBalance: [
    {
      leaveType: 'sick',
      balance: 10,
    },
    {
      leaveType: 'casual',
      balance: 4.5,
    },
    {
      leaveType: 'maternity',
      balance: '6 Months',
    },
  ],
  returningToWorkDate: {
    date: 'Wed Nov 15 2023 00:00:00 GMT+0530 (India Standard Time)',
  },
  aboutLeaveType: [
    {
      leaveType: 'sick',
      about: 'This is all about sick leave',
      pdfLink: 'http',
    },
    {
      leaveType: 'casual',
      about: 'This is all about casual leave',
      pdfLink: 'http',
    },
    {
      leaveType: 'maternity',
      about: 'This is all about Maternity leave',
      pdfLink: 'http',
    },
  ],
  leaveTypeCode: {
    casualLeave: 'CL',
    sickLeave: 'SL',
    maternityLeave: 'MT',
    privilegeLeave: 'PL',
    paternityLeave: 'PT',
    lwpAuthorized: 'LWP_AUTH',
    lwpUnauthorized: 'LWP_UNAUTH',
    adoptionLeave: 'MotherAdoption',
    adoptionLeaveFather: 'FatherAdoption',
    surrogacyLeave: 'CommissioningMother',
    surrogacyLeaveFather: 'CommissioningFather',
    relocationTdr: 'RL1',
    relocationPdr: 'RL2',
    relocationGma: 'RL3',
    repatriationGma: 'RL4',
    compensatory: 'Compoff',
    suspensionLeave: 'SUSP',
    miscarriageLeave: 'MiscaMedtermPregnancy',
  },
  leaveTypeInfo: {
    casual: {
      aboutLeave:
        'All about casual leave and from below you can download policy as well !',
      title: 'Casual Leave',
      policyLink: '',
    },
    sick: {
      aboutLeave:
        'All about sick leave and from below you can download policy as well !',
      title: 'Sick Leave',
      policyLink: '',
    },
    maternity: {
      aboutLeave:
        'All about maternity leave and from below you can download policy as well !',
      title: 'Maternity Leave',
      policyLink: '',
    },
    privilege: {
      aboutLeave:
        'All about privilege leave and from below you can download policy as well !',
      title: 'Privilege Leave',
      policyLink: '',
    },
    paternity: {
      aboutLeave:
        'All about paternity leave and from below you can download policy as well !',
      title: 'Paternity Leave',
      policyLink: '',
    },
    LWP: {
      aboutLeave:
        'All about LWP leave and from below you can download policy as well !',
      title: 'LWP Leave',
      policyLink: '',
    },
    adoption: {
      aboutLeave:
        'All about adoption leave and from below you can download policy as well !',
      title: 'Adoption Leave',
      policyLink: '',
    },
    surrogacy: {
      aboutLeave:
        'All about surrogacy leave and from below you can download policy as well !',
      title: 'Surrogacy Leave',
      policyLink: '',
    },
    relocation: {
      aboutLeave:
        'All about relocation leave and from below you can download policy as well !',
      title: 'Relocation Leave',
      policyLink: '',
    },
    repatriation: {
      aboutLeave:
        'All about repatriation leave and from below you can download policy as well !',
      title: 'Repatriation Leave',
      policyLink: '',
    },
    compensatory: {
      aboutLeave:
        'All about compensatory leave and from below you can download policy as well !',
      title: 'Compensatory Leave',
      policyLink: '',
    },
  },
  leaveInputFieldsTitle: {
    dateOfAdoption: 'Date of Adoption',
    employeeChildAge: 'Child Age',
    dateOfDelivery: 'Date of Delivery',
    leaveBalance: 'Balance',
    leaveType: 'Leave Type',
    startDate: 'Start Date',
    endDate: 'End Date',
    leaveDuration: 'Duration',
    returningToWork: 'Returning to work',
    leaveReason: 'Leave Reason',
    expectedDateOfDelivery: 'Expected Date of Child',
    dateOfRelocation: 'Date of Relocation',
    uploadDocument: 'Upload Document',
  },
  viewEditLeaveInfo: {
    leaveId: 'LE123',
    leaveType: 'maternity',
    startDate: 'Wed Nov 15 2023 00:00:00 GMT+0530 (India Standard Time)',
    endDate: 'Wed Nov 15 2023 00:00:00 GMT+0530 (India Standard Time)',
    duration: 1,
    leaveBalance: 5,
    returningToWork: 'Fri Nov 17 2023 00:00:00 GMT+0530 (India Standard Time)',
    leaveReason: "This is the reason why i can't join the event",
    approvalStatus: 'Pending',
    createdOn: 'Tue Nov 14 2023 00:00:00 GMT+0530 (India Standard Time)',
    uploadedDocument: { size: 12321, name: 'Document_1.png' },
    dateOfDelivery: 'Tue Nov 14 2023 00:00:00 GMT+0530 (India Standard Time)',
    expectedDateOfDelivery:
      'Tue Nov 14 2023 00:00:00 GMT+0530 (India Standard Time)',
    dateOfRelocation: 'Tue Nov 14 2023 00:00:00 GMT+0530 (India Standard Time)',
    dateOfAdoption: 'Tue Nov 14 2023 00:00:00 GMT+0530 (India Standard Time)',
  },
  approvalStatusOptions: {
    pending: 'PENDING',
    pendingCancellation: 'PENDING_CANCELLATION',
    approved: 'APPROVED',
    rejected: 'REJECTED',
  },
  fractionQuantityOptions: [
    { value: '0.5', label: 'Half Day' },
    { value: '1', label: 'Full Day' },
  ],
  dialogInfo: {
    deleteLeaveWarning: {
      message:
        'Are you sure you want to delete this leave request? The action cannot be undone',
      title: 'Delete leave request',
      buttonText: 'Yes, delete this leave request',
    },
    updateLeaveSuccess: {
      message: 'Your leave information successfully updated',
      title: 'Updated',
      iconPath: '/content/dam/my-ai/icon/updated.gif',
      iconColor: 'info',
    },
    applyLeaveSuccess: {
      message: 'Your leave request successfully created',
      title: 'Applied',
      iconPath: '/content/dam/my-ai/icon/updated.gif',
      iconColor: 'info',
    },
    deleteLeaveSuccess: {
      message: 'Your request was deleted',
      title: 'Leave request deleted',
      iconPath: '/content/dam/my-ai/icon/delete.gif',
      iconColor: 'error',
    },
  },
  fields: {
    heading: 'Leave Application',
    errors: {
      mandatoryField: {
        icon: 'cancel',
        message: 'All fields are mandatory',
      },
      mandatoryDocument: {
        icon: 'cancel',
        message: 'Supporting document is mandatory',
      },
      wrongDocumentTypeOrSize: {
        icon: 'cancel',
        message: 'Wrong document type or size is not under 5000 KB',
      },
      doubleFileExtension: {
        icon: 'cancel',
        message:
          'Filename with two extensions is not supported due security restrictions',
      },
      approvedPendingLeaveCancellation: {
        icon: 'cancel',
        message:
          'Sorry, you cannot cancel this leave request yet. Please wait until an admin or manager has approved the most recent changes to the leave request.',
      },
    },
    daysLabel: 'Days',
    leaveCommentMaxLengthLabel: '/ 500',
    aboutPolicyIcon: 'info',
    aboutPolicyLabel: 'About',
    downloadIcon: 'download_2',
    downloadPolicy: 'Download Policy',
    articleIcon: 'article',
    closeIcon: 'close',
    submitButtonLabel: 'Submit',
    resetButtonLabel: 'Reset',
    deleteIcon: 'delete_outline',
    deleteLabel: 'Delete',
    viewIcon: 'remove_red_eye',
    viewLabel: 'View',
  },
  viewEditLeaveRequestFields: {
    heading: 'View / Edit Leave',
    headingView: 'View Leave',
    leaveBalanceLabel: 'Balance',
    daysLabel: 'Days',
    durationLabel: 'Duration',
    returningToWork: 'Returning to work',
    dateOfDeliveryLabel: 'Date of Delivery',
    dateOfDeliveryOrDateOfAdoptionLabel: 'Date of Delivery/ Date of Adoption',
    dateOfRelocationLabel: 'Date of Relocation',
    expectedDateOfChildLabel: 'Expected Date of Child',
    leaveReasonLabel: 'Leave Reason',
    employeeChildAgeLabel: 'Child Age',
    outOfPostFix: '/ 500',
    approvalStatus: 'Approval Status',
    createdOnLabel: 'Created on',
    articleLabel: 'Article',
    closeLabel: 'Close',
    cancelEditLabel: 'Cancel Edit',
    saveLabel: 'Save',
    deleteLeaveLabel: 'Delete Leave',
    deleteIconName: 'delete',
  },
};

export const LeaveRequestComponent = {
  icon: {
    pendingIcon: 'timelapse',
    approvedIcon: 'check',
    rejectedIcon: 'close',
    arrowDropUpIcon: 'arrow_drop_up',
    arrowDrupDownIcon: 'arrow_drop_down',
  },
  label: {
    pendingLabel: 'Pending',
    approvedLabel: 'Approved',
    rejectedLabel: 'Rejected',
    leaveTypeLabel: 'Leave Type',
    dateFromLabel: 'Date From',
    dateToLabel: 'Date To',
    requestDaysLabel: 'Request Days',
    submittedDateLabel: 'Submitted Date',
    approveDateLabel: 'Approved Date',
    rejectedDateLabel: 'Rejected Date',
    viewEditLabel: 'View / Edit',
    viewLabel: 'View',
  },
  column: {
    leaveTypeColumn: 'leave_type',
    startDateColumn: 'startDate',
    endDateColumn: 'endDate',
    durationColumn: 'duration',
    submittedDateColumn: 'submittedDate',
    approvedRejectedDateColumn: 'approvedRejectedDate',
    editColumn: 'edit',
    pendingFilter: 'PENDING',
    pendingCancellationFilter: 'PENDING_CANCELLATION',
    approvedFilter: 'APPROVED',
    rejectedFilter: 'REJECTED',
  },
};

export const HolidayLeaveCommonComponent = {
  label: {
    noHolidayLeaveAvaialble: 'No Holidays / Leaves this month',
  },
};

export const calendarToBeHide = [
  'FHC',
  'Holiday_Vishakapatnam',
  'Holiday_Cochin',
  'Holiday_Chennai',
  'Holiday_Hyderabad',
  'Holiday_Mumbai_Pune_Goa_Surat',
  'Holiday_Bengaluru_Redfort_RMZ_Bengaluru_Airport_Bengaluru_Alpha3',
  'Holiday_Kolkata_Bhubaneshwar_Bagdogra_Guwahati_Imphal_Ranchi',
  'Holiday_New Delhi_Gurugram_Jaipur_Srinagar_Lucknow',
];

export const adobeAnalyticsLeaveConstant = {
  leaveDashboard: {
    onLeaveDashboardLoad: {
      isErrorPage: false,
      siteSection: 'Leave Request',
      siteSubSection: 'Dashboard',
    },
  },
};

export const leaveTypes = {
  PL: 'Privilege Leave',
  CL: 'Casual Leave',
  SL: 'Sick Leave',
  LWP_AUTH: 'LWP - Authorized',
  PT: 'Paternity Leave',
  FatherAdoption: 'Adoption Leave',
  CommissioningFather: 'Surrogacy Leave',
  RL1: 'Relocation Leave - Temporary Domestic Relocation',
  RL2: 'Relocation Leave - Permanent Domestic Relocation',
  RL3: 'Relocation Leave - Global Mobility Assignments',
  RL4: 'Repatriation Leave - Global Mobility Assignments',
  Compoff: 'Compensatory Leave',
};
