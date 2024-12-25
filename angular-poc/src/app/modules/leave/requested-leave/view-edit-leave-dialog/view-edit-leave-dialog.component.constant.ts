export const viewEditLeaveData = {
  getPickList: {
    status: {
      code: 200,
      message: 'SUCCESS',
      status: null,
      errors: null,
    },
    data: {
      leaveTypes: [
        {
          leaveCode: 'PL',
          leaveBalance: '100',
          leaveDescription: 'Privilege Leave',
        },
        {
          leaveCode: 'CL',
          leaveBalance: '5',
          leaveDescription: 'Casual Leave',
        },
        {
          leaveCode: 'SL',
          leaveBalance: '6',
          leaveDescription: 'Sick Leave',
        },
        {
          leaveCode: 'LWP_AUTH',
          leaveDescription: 'LWP - Authorized',
        },
        {
          leaveCode: 'PT',
          leaveDescription: 'Paternity Leave',
        },
        {
          leaveCode: 'FatherAdoption',
          leaveDescription: 'Adoption Leave',
        },
        {
          leaveCode: 'CommissioningFather',
          leaveDescription: 'Surrogacy Leave',
        },
        {
          leaveCode: 'RL1',
          leaveDescription:
                'Relocation Leave - Temporary Domestic Relocation',
        },
        {
          leaveCode: 'RL2',
          leaveDescription:
                'Relocation Leave - Permanent Domestic Relocation',
        },
        {
          leaveCode: 'RL3',
          leaveDescription:
                'Relocation Leave - Global Mobility Assignments',
        },
        {
          leaveCode: 'RL4',
          leaveDescription:
                'Repatriation Leave - Global Mobility Assignments',
        },
        {
          leaveCode: 'Compoff',
          leaveDescription: 'Compensatory Leave',
        },
      ],
    },
  },
  getEmpDataStatus: true,
  editLeavesFormData: {
    startDate: null,
    endDate: null,
    leaveType: null,
    leaveDuration: null,
    returningToWorkDate: null,
  },
  leaveBalanceValue: 0,
  leaveTypesOptionData: [
    { value: 'leaveType1', label: 'Leave Type 1', balance: '5' },
    { value: 'leaveType2', label: 'Leave Type 2', balance: '10' },
  ],
  editLeaveTypeFormValue: null,
  editLeaveFormSetValues: 'leaveType1',
  selectedLeaveTypeBalance: 5,
  leaveDuration: null,
  returningToWorkDate: null,
  leaveDurationLabel: 'SomeLabel',
  editLeaveFormData2: {
    startDate: '2024-02-09',
    endDate: '2024-02-10',
    leaveType: 'Sick Leave',
    leaveDuration: null,
    returningToWorkDate: null,
  },
  testLeave: 'testLeave',
  pendingLeaveType: 'PL',
  getLeaveDuration: null,
  getLeaveDurationNotDefined: undefined,
  attachmentName: 'MockName',
  attachmentId: 'MockID',
  formatedDate: '2024-02-09T12:34:56.789Z',
  testFormattedDate: '9/2/2024',
  hyphen: '-',
  leaveTypeControl: 'some_other_leave_type',
  mockErrors: 'error1;error2;error3',
  mockElementId: 'viewEditDialog',
  mockName: 'MockName',
  mockFile: {
    size: 1,
    name: 'mock',
  },
  showFileUploader: false,
  mockErrorMessage: 'This is mock error message',
  pickListData: [
    {
      externalCode: 'lessthan2',
      label: 'Less than 2 years',
    },
    {
      externalCode: 'greaterthan2',
      label: 'Greater than 2 years',
    },
  ],
  setLeaveDuration1: 1,
  setLeaveDuration2: 2,
  fractionQuantityValue: 'someValue',
  mockId: 'mock_id',
  statusApproved: 'APPROVED',
  requestedLeaveEmployeeId: '1',
  requestedLeaveId: 123,
  statusPending: 'PENDING',
  actionType: 'delete',
  editLeaveStartDate: '2023-01-01',
  leaveTypesOptionArray: {
    label: 'Casual Leave',
    value: 'CL',
    balance: '10',
  },
  casualLeaveData: [
    {
      leaveDescription: 'Casual Leave',
      leaveCode: 'CL',
      leaveBalance: '10',
    },
  ],
  uploadMockDataAttachment: {
    progress: 50,
    name: 'document.pdf',
    size: 10000,
    type: 'application/pdf',
    lastModified: 1678886400000,
  },
  attachmentDocumentId: 'attachment123',
  mockErrorResponse1: 'Network error',
  mockErrorResponse2: 'Upload failed',
  mockErrorResponse3: 'Network error',
  leaveTypesCode: {
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
  selectedUploadDocument: {
    name: 'document.pdf',
    size: 10000,
  },
  editLeaveFormSubmitLeavesEmployeeId: '123',
  mandatoryFields: 'Fill the mandatory fields',
  sickType: 'SICK',
  apiConfigData: '123',
  annualLeaveType: 'Annual Leave',
  leaveType: 'leaveType',
  actionDeleteType: 'Delete',
  cancelEdit: 'Cancel Edit',
  cancelActionType: 'Cancel',
  addoptionLeaveFather: 'ADOPTION_FATHER',
  adoptionSickLeave: 'SICK_LEAVE',
  mockTestID: 'testId',
  someSupportedDocument: 'someSupportedDocument',
  documentPDF: 'document.pdf',
  iconPath: '/AEMDATA/content/dam/my-ai/icon/delete.gif',
  mockResponseFileUploaded: {
    supportedDocumentFileName: 'document.pdf',
    supportedDocument: 'someSupportedDocument',
    leaveCode: 'ADOPTION', // This should trigger getChildAgeOptionsListFromPickList
  },

};
