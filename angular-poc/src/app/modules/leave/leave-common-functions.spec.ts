import {
  checkMandatoryFieldsInApplyLeaveValidation,
  checkMandatoryDocumentsInApplyLeaveValidation,
} from './leave-common-functions';

/* eslint-disable  @typescript-eslint/no-shadow */
describe('Leave Validation Functions', () => {
  let leaveForm;
  let leaveTypeCodes;
  let selectedUploadDocument;

  beforeEach(() => {
    leaveForm = {};
    leaveTypeCodes = {
      surrogacyLeave: 'SURROGACY',
      adoptionLeave: 'ADOPTION',
      maternityLeave: 'MATERNITY',
      paternityLeave: 'PATERNITY',
      relocationGma: 'RELOCATION_GMA',
      relocationPdr: 'RELOCATION_PDR',
      relocationTdr: 'RELOCATION_TDR',
      repatriationGma: 'REPATRIATION_GMA',
      sickLeave: 'SICK_LEAVE',
      lwpAuthorized: 'LWP_AUTHORIZED',
    };
    selectedUploadDocument = {};
  });

  it('should return true for checkMandatoryFieldsInApplyLeaveValidation when mandatory fields are missing', () => {
    leaveForm = {
      endDate: '2024-02-10',
      leaveType: leaveTypeCodes.surrogacyLeave,
    };
    expect(
      checkMandatoryFieldsInApplyLeaveValidation(leaveForm, leaveTypeCodes),
    ).toBe(true);
  });

  it('should return false for checkMandatoryFieldsInApplyLeaveValidation when all mandatory fields are present', () => {
    leaveForm = {
      startDate: '2024-02-01',
      endDate: '2024-02-10',
      leaveType: leaveTypeCodes.surrogacyLeave,
      expectedDateOfDelivery: '2024-08-01',
    };
    expect(
      checkMandatoryFieldsInApplyLeaveValidation(leaveForm, leaveTypeCodes),
    ).toBe(false);
  });

  it('should return true for checkMandatoryDocumentsInApplyLeaveValidation when mandatory documents are missing', () => {
    leaveForm = { leaveType: leaveTypeCodes.sickLeave, leaveDuration: 3 };
    expect(
      checkMandatoryDocumentsInApplyLeaveValidation(
        leaveForm,
        leaveTypeCodes,
        selectedUploadDocument,
      ),
    ).toBe(false);
  });

  it('should return false for checkMandatoryDocumentsInApplyLeaveValidation when all mandatory documents are present', () => {
    leaveForm = { leaveType: leaveTypeCodes.sickLeave, leaveDuration: 3 };
    selectedUploadDocument = { name: 'sickLeaveDocument.pdf' };
    expect(
      checkMandatoryDocumentsInApplyLeaveValidation(
        leaveForm,
        leaveTypeCodes,
        selectedUploadDocument,
      ),
    ).toBe(false);
  });

  describe('checkMandatoryFieldsInApplyLeaveValidation', () => {
    it('should return true if endDate is missing', () => {
      const leaveForm = {
        startDate: '2024-04-23',
        leaveType: 'someLeaveType',
      };

      const result = checkMandatoryFieldsInApplyLeaveValidation(
        leaveForm,
        leaveTypeCodes,
      );

      expect(result).toBe(true);
    });

    it('should return true if startDate is missing', () => {
      const leaveForm = {
        endDate: '2024-04-30',
        leaveType: 'someLeaveType',
      };

      const result = checkMandatoryFieldsInApplyLeaveValidation(
        leaveForm,
        leaveTypeCodes,
      );

      expect(result).toBe(true);
    });
  });

  describe('checkMandatoryDocumentsInApplyLeaveValidation', () => {
    it('should return true if document is missing for surrogacy leave', () => {
      const leaveForm = {
        leaveType: leaveTypeCodes.surrogacyLeave,
      };
      const selectedUploadDocument = null;

      const result = checkMandatoryDocumentsInApplyLeaveValidation(
        leaveForm,
        leaveTypeCodes,
        selectedUploadDocument,
      );

      expect(result).toBe(true);
    });

    it('should return true if document is missing for sick leave with duration > 3', () => {
      const leaveForm = {
        leaveType: leaveTypeCodes.sickLeave,
        leaveDuration: 4,
      };
      const selectedUploadDocument = null;

      const result = checkMandatoryDocumentsInApplyLeaveValidation(
        leaveForm,
        leaveTypeCodes,
        selectedUploadDocument,
      );

      expect(result).toBe(true);
    });
  });
});
