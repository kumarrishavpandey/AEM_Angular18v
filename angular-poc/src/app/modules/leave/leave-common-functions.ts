export function checkMandatoryFieldsInApplyLeaveValidation(
  leaveForm,
  leaveTypeCodes,
) {
  if (!leaveForm?.endDate || !leaveForm?.startDate || !leaveForm?.leaveType) {
    return true;
  }
  if (
    (leaveForm?.leaveType === leaveTypeCodes.surrogacyLeave
      && !leaveForm?.expectedDateOfDelivery)
    || (leaveForm?.leaveType === leaveTypeCodes.surrogacyLeaveFather
      && !leaveForm?.expectedDateOfDelivery)
    || (leaveForm?.leaveType === leaveTypeCodes.adoptionLeave
      && !leaveForm?.employeeChildAge)
    || (leaveForm?.leaveType === leaveTypeCodes.adoptionLeaveFather
      && !leaveForm?.expectedOrActualDateOfChildBirth)
    || (leaveForm?.leaveType === leaveTypeCodes.maternityLeave
      && !leaveForm?.dateOfDelivery)
    // || (leaveForm?.leaveType === leaveTypeCodes.paternityLeave
    //   && !leaveForm?.dateOfDelivery)
    || (leaveForm?.leaveType === leaveTypeCodes.relocationGma
      && !leaveForm?.dateOfRelocation)
    || (leaveForm?.leaveType === leaveTypeCodes.relocationPdr
      && !leaveForm?.dateOfRelocation)
    || (leaveForm?.leaveType === leaveTypeCodes.relocationTdr
      && !leaveForm?.dateOfRelocation)
    || (leaveForm?.leaveType === leaveTypeCodes.repatriationGma
      && !leaveForm?.dateOfRelocation)
  ) {
    return true;
  }
  return false;
}
export function checkMandatoryDocumentsInApplyLeaveValidation(
  leaveForm,
  leaveTypeCodes,
  selectedUploadDocument,
) {
  if (
    (leaveForm?.leaveType === leaveTypeCodes.sickLeave
      && leaveForm?.leaveDuration > 3
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.surrogacyLeave
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.surrogacyLeaveFather
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.adoptionLeave
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.adoptionLeaveFather
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.lwpAuthorized
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.maternityLeave
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.paternityLeave
      && !selectedUploadDocument?.name)
    || (leaveForm?.leaveType === leaveTypeCodes.miscarriageLeave
      && !selectedUploadDocument?.name)
  ) {
    return true;
  }
  return false;
}
