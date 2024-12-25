export const requestedLeaveData = {
  leaveSampleData1: [
    {
      leaveId: 'e29fe8489ffb4512a1664e008c700d31',
      status: 'APPROVED',
      leaveCode: 'PL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Privilege Leave',
      submittedDate: '2024-01-22 09:18:37',
    },
    {
      leaveId: 'ddbd514890c6438ab770797b3fadd063',
      status: 'CANCELLED',
      leaveCode: 'CL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Casual Leave',
      submittedDate: '2024-01-22 09:18:37',
    },
  ],
  leaveSampleData2: [
    {
      leaveId: 'sample-leave-id-1',
      status: 'Pending',
      leaveCode: 'PL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Privilege Leave',
      submittedDate: '2024-01-22 09:18:37',
    },
    {
      leaveId: 'sample-leave-id-2',
      status: 'Approved',
      leaveCode: 'CL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Casual Leave',
      submittedDate: '2024-01-22 09:18:37',
    },
  ],
  leaveConstantData: {
    column: {
      pendingFilter: 'Pending',
      approvedFilter: 'Approved',
      rejectedFilter: 'Rejected',
      leaveTypeColumn: 'Leave Type',
      startDateColumn: 'Start Date',
      endDateColumn: 'End Date',
      durationColumn: 'Duration',
      submittedDateColumn: 'Submitted Date',
      approvedRejectedDateColumn: 'Approved/Rejected Date',
      editColumn: 'Edit',
    },
  },
  leavePendingData: [
    {
      leaveId: 'sample-leave-id-1',
      status: 'Pending',
      leaveCode: 'PL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Privilege Leave',
      submittedDate: '2024-01-22 09:18:37',
    },
  ],
  leaveApprovedData: [
    {
      leaveId: 'sample-leave-id-2',
      status: 'Approved',
      leaveCode: 'CL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Casual Leave',
      submittedDate: '2024-01-22 09:18:37',
    },
  ],
  leaveDataSuccess: [
    {
      leaveId: 'leave-id-1',
      status: 'APPROVED',
      leaveCode: 'PL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Privilege Leave',
      submittedDate: '2024-01-22 09:18:37',
      isWithinFinancialYear: false,
    },
    {
      leaveId: 'leave-id-2',
      status: 'CANCELLED',
      leaveCode: 'CL',
      approvedRejectedDate: '2024-01-22 09:18:37',
      startDate: '2024-01-22 09:18:37',
      endDate: '2024-01-23 09:18:37',
      duration: 1,
      leave_type: 'Casual Leave',
      submittedDate: '2024-01-22 09:18:37',
      isWithinFinancialYear: false,
    },
  ],
  leaveTypeSuccess: [
    { leaveCode: 'PL', leaveDescription: 'Privilege Leave' },
    { leaveCode: 'CL', leaveDescription: 'Casual Leave' },
  ],
  storageEncryptionServiceValue: '80053504',
  startDate: '2024-04-01',
  endDate: '2024-09-30',
  financialYearStartDate: '2024-04-01',
  financialYearEndDate: '2025-03-31',
};
