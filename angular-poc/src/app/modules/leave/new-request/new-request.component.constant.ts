export const newRequestModule = {
  leaveTypeOption: [
    {
      value: 'someLeaveType',
      label: 'Some Leave Type',
      balance: '5',
    },
    {
      value: 'someOtherLeaveType',
      label: 'Some Other Leave Type',
      balance: '10',
    },
  ],
  documentSizeOrTypeError: true,
  onSizeOrTypeErrorInSelectDocument: false,
  leaveFormPatchValue: {
    leaveType: 'someLeaveType',
    attachmentInBase64: 'base64',
    attachmentName: 'FileName',
  },
  fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  attachmentMockResponse: {
    data: {
      attachmentId: '123456789',
    },
  },
  attachmentIdNumber: '123456789',
  uploadFailed: 'Upload failed',
  selectedUploadDocument: {
    name: 'Sample File',
  },
  applyLeaveFormValues: {
    leaveType: 'someLeaveType',
    startDate: 'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    endDate: 'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    leaveReason: 'leave reason',
    dateOfDelivery: 'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    dateOfAdoption: 'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    dateOfRelocation:
      'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    expectedDateOfDelivery:
      'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    leaveDuration: 2,
    fractionQuantity: '0.5',
    leaveBalance: 2,
    returningToWorkDate:
      'Mon Jan 22 2024 19:27:05 GMT+0530 (India Standard Time)',
    attachmentInBase64: 'base64',
    attachmentName: 'FileName',
  },
  dummyMockResponse: {
    data: {},
  },
  dummySampleFile: {
    name: 'Sample File',
  },
  dummyMockError: {
    error: {
      status: {
        message: 'Error message',
      },
    },
  },
  hyphen: '-',
  selectedFile: 'file',
  selectedEmptyDocument: null,
  sampleUrl: '/url',
  blank: '_blank',
  apiFailure: 'API failure',
  duration: {
    data: {
      duration: 1,
      returnToWork: new Date(),
    },
  },
  pdfFile: '/content/dam/my-ai/policy/leave/Leave_Management_for_H2_FY_2023-2024.pdf',
  leaveCode: 'MotherAdoption',
  iconName: 'info',
  buttonIconName: 'download_2',
  buttonLabel: 'Download Policy',
  title: 'About Adoption Leave',
  shortDescription: {
    plaintext:
      'This leave supports adopting parent(s) with paid time off to care for their new addition during their adoption journey.',
  },
  filterLeaveOptions: {
    data: {
      leaveTypes: [
        {
          leaveDescription: 'All about leave',
          leaveCode: 'CL',
          leaveBalance: '4',
        },
      ],
    },
  },
  picklistResponse: [
    {
      Picklist: [
        { externalCode: '1', label: '1 year old' },
        { externalCode: '2', label: '2 years old' },
      ],
    },
  ],
  employeeChildAgeOptionsArray: [
    { value: '1', label: '1 year old' },
    { value: '2', label: '2 years old' },
  ],
  getPickListError: 'API Error',
  aboutLeavesList: [
    {
      leaveCode: 'SL',
    },
  ],
  dummyLeaveType: {
    leaveType: 'SL',
  },
  someOtherLeaveType: {
    leaveType: 'SomeOtherLeaveType',
  },
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
  applyLeaveDates: {
    startDate: new Date(),
    endDate: new Date(),
    leaveType: 'CL',
  },
  eventName: {
    label: 'MockLabel',
  },
  networkError: 'Network error',
  leaveType: 'leaveType',
  startDate: 'startDate',
  endDate: 'endDate',
  leaveReason: 'leaveReason',
  dummyValue: 'Lorem ipsum dolor sit amet, consectetur consectetur elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  labelDelete: 'Delete Document',
  mockProgress: {
    progress: 50,
  },
  uploadApplyLeaveDocument: undefined,
  resetButtonLabel: 'Reset',
  adoptionLeaveType: {
    leaveType: 'adoption-father',
  },
  sickLeaveType: {
    leaveType: 'sick-leave',
  },
  noLeaveType: {
    leaveType: undefined,
  },
};
