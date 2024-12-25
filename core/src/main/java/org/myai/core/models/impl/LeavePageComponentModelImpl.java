package org.myai.core.models.impl;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.myai.core.beans.common.AnalyticsInfo;
import org.myai.core.beans.leave.DialogDeleteLeave;
import org.myai.core.beans.leave.DialogViewEdit;
import org.myai.core.beans.leave.LabelsLeaveModule;
import org.myai.core.beans.leave.TabDashboard;
import org.myai.core.beans.leave.TabNewRequest;
import org.myai.core.beans.leave.TabRequestedLeave;
import org.myai.core.beans.leave.UploadDocument;
import org.myai.core.models.LeavePageComponentModel;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { LeavePageComponentModel.class,
    ComponentExporter.class }, resourceType = LeavePageComponentModelImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LeavePageComponentModelImpl implements LeavePageComponentModel{

    static final String RESOURCE_TYPE = "myai/components/leave";

    @ValueMapValue
    private String pageTitle;

    @ValueMapValue
    private String dashboardLabelTab;

    @ValueMapValue
    private String btnCalendarView;

    @ValueMapValue
    private String iconBtnCalendarView;

    @ValueMapValue
    private String btnListView;

    @ValueMapValue
    private String iconBtnListView;

    @ValueMapValue
    private String labelSelectRegion;

    @ValueMapValue
    private String iconSelectRegion;

    @ValueMapValue
    private String labelBalance;

    @ValueMapValue
    private String btnApplyLeave;

    @ValueMapValue
    private String iconExpandMore;

    @ValueMapValue
    private String iconRightArrow;

    @ValueMapValue
    private String labelDaysDashboard;

    @ValueMapValue
    private String labelUpcomingHeading;

    @ValueMapValue
    private String labelWeekend;

    @ValueMapValue
    private String labelApprovedLeave;

    @ValueMapValue
    private String labelPendingLeave;

    @ValueMapValue
    private String labelWorkingWeek;

    @ValueMapValue
    private String labelHoliday;

    @ValueMapValue
    private String iconLeftArrow;

    @ValueMapValue
    private String labelMore;

    @ValueMapValue
    private String iconNavigateBefore;

    @ValueMapValue
    private String iconNavigateNext;

    @ValueMapValue
    private String iconTimelapse;

    @ValueMapValue
    private String iconMasks;

    @ValueMapValue
    private String iconLuggage;

    @ValueMapValue
    private String iconFlag;

    @ValueMapValue
    private String iconLogout;

    @ValueMapValue
    private String labelHalfDay;

    @ValueMapValue
    private String labelAllDay;

    @ValueMapValue
    private String labelApproved;

    @ValueMapValue
    private String labelPending;

    @ValueMapValue
    private String labelRejected;

    @ValueMapValue
    private String labelNoHolidayLeaveList;

    @ValueMapValue
    private String newRequestLabelTab;

    @ValueMapValue
    private String labelFormHeading;

    @ValueMapValue
    private String financialYearStartDate;

    @ValueMapValue
    private String financialYearEndDate;

    @ValueMapValue
    private String labelLeaveType;

    @ValueMapValue
    private String labelLeaveBalance;

    @ValueMapValue
    private String labelStartDate;

    @ValueMapValue
    private String labelEndDate;

    @ValueMapValue
    private String labelDays;

    @ValueMapValue
    private String labelLeaveDuration;

    @ValueMapValue
    private String labelReturningToWork;

    @ValueMapValue
    private String labelDateOfDelivery;

    @ValueMapValue
    private String labelEmployeeChildAge;

    @ValueMapValue
    private String labelDateOfRelocation;

    @ValueMapValue
    private String labelExpectedDateOfChild;

    @ValueMapValue
    private String labelLeaveReason;

    @ValueMapValue
    private String maxCharLengthLeaveReason;

    @ValueMapValue
    private String labelUploadDocument;

    @ValueMapValue
    private String btnReset;

    @ValueMapValue
    private String btnSubmit;

    @ValueMapValue
    private String iconArticle;

    @ValueMapValue
    private String iconClose;

    @ValueMapValue
    private String labelLeaveReasonPlaceholder;

    @ValueMapValue
    private String labelMandatoryFieldErrorMsg;

    @ValueMapValue
    private String labelMandatoryDocumentErrorMsg;

    @ValueMapValue
    private String labelWrongDocumentTypeOrSizeErrorMsg;

    @ValueMapValue
    private String labelDoubleFileExtensionErrorMsg;

    @ValueMapValue
    private String labelApprovedPendingLeaveCancellationErrorMsg;

    @ValueMapValue
    private String iconCloudUpload;

    @ValueMapValue
    private String labelDragDropFiles;

    @ValueMapValue
    private String labelBrowse;

    @ValueMapValue
    private String labelDescriptionOne;

    @ValueMapValue
    private String labelDescriptionTwo;

    @ValueMapValue
    private String iconCloudUploadMobile;

    @ValueMapValue
    private String btnUploadDocument;

    @ValueMapValue
    private String labelUploading;

    @ValueMapValue
    private String labelUploaded;

    @ValueMapValue
    private String labelProgressIndicator;

    @ValueMapValue
    private String uploadIconArticle;

    @ValueMapValue
    private String uploadIconClose;

    @ValueMapValue
    private String requestedLeaveLabelTab;

    @ValueMapValue
    private String btnPending;

    @ValueMapValue
    private String iconPending;

    @ValueMapValue
    private String btnApproved;

    @ValueMapValue
    private String iconApproved;

    @ValueMapValue
    private String btnRejected;

    @ValueMapValue
    private String iconRejected;

    @ValueMapValue
    private String labelLeaveTypeTabRequested;

    @ValueMapValue
    private String labelDateFrom;

    @ValueMapValue
    private String labelDateTo;

    @ValueMapValue
    private String labelRequestDays;

    @ValueMapValue
    private String labelSubmittedDate;

    @ValueMapValue
    private String labelApprovedDate;

    @ValueMapValue
    private String labelRejectedDate;

    @ValueMapValue
    private String btnViewEdit;

    @ValueMapValue
    private String btnView;

    @ValueMapValue
    private String iconArrowDropUp;
    
    @ValueMapValue
    private String iconArrowDropDown;

    @ValueMapValue
    private String labelDialogViewEdit;

    @ValueMapValue
    private String labelDialogView;

    @ValueMapValue
    private String labelApprovalStatus;

    @ValueMapValue
    private String labelCreatedOn;

    @ValueMapValue
    private String labelUploadedDocuments;

    @ValueMapValue
    private String iconDelete;

    @ValueMapValue
    private String btnDeleteLeave;

    @ValueMapValue
    private String btnCancelEdit;

    @ValueMapValue
    private String btnSave;

    @ValueMapValue
    private String labelDialogDeleteLeave;

    @ValueMapValue
    private String iconCloseDeleteLeave;

    @ValueMapValue
    private String  labelDeleteConfirmation;

    @ValueMapValue
    private String btnCancel;

    @ValueMapValue
    private String btnDelete;

    @ValueMapValue
    private String countryCode;

    @ValueMapValue
    private String countryName;

    @ValueMapValue
    private String language;

    @ValueMapValue
    private String pageName;

    @ValueMapValue
    private String pageType;

    @ValueMapValue
    private String server;

    @ValueMapValue
    private String siteName;

    @ValueMapValue
    private String iconDeleteNewRequest;

    @ValueMapValue
    private String labelDelete;

    @ValueMapValue
    private String iconView;

    @ValueMapValue
    private String labelView;

    @ValueMapValue
    private String labelCompoffDate;

    @ValueMapValue
    private String labelMiscarriageDate;

    @ValueMapValue  
    private String labelExpectedOrActualDateOfChildBirth;

    @ValueMapValue
    private String labelFileUploadingMultipleTimesError;

    @ValueMapValue  
    private String labelApproverComment;


    private LabelsLeaveModule labelsLeaveModule;

    @PostConstruct
    protected void init() {
        labelsLeaveModule = new LabelsLeaveModule();
        labelsLeaveModule.setPageTitle(pageTitle);

        TabDashboard tabDashboard = new TabDashboard();
        tabDashboard.setLabelTab(dashboardLabelTab);
        tabDashboard.setBtnCalendarView(btnCalendarView);
        tabDashboard.setIconBtnCalendarView(iconBtnCalendarView);
        tabDashboard.setBtnListView(btnListView);
        tabDashboard.setIconBtnListView(iconBtnListView);
        tabDashboard.setLabelSelectRegion(labelSelectRegion);
        tabDashboard.setIconSelectRegion(iconSelectRegion);
        tabDashboard.setLabelBalance(labelBalance);
        tabDashboard.setBtnApplyLeave(btnApplyLeave);
        tabDashboard.setIconExpandMore(iconExpandMore);
        tabDashboard.setIconRightArrow(iconRightArrow);
        tabDashboard.setLabelDaysDashboard(labelDaysDashboard);
        tabDashboard.setLabelUpcomingHeading(labelUpcomingHeading);
        tabDashboard.setLabelWeekend(labelWeekend);
        tabDashboard.setLabelApprovedLeave(labelApprovedLeave);
        tabDashboard.setLabelPendingLeave(labelPendingLeave);
        tabDashboard.setLabelWorkingWeek(labelWorkingWeek);
        tabDashboard.setLabelHoliday(labelHoliday);
        tabDashboard.setIconLeftArrow(iconLeftArrow);
        tabDashboard.setLabelMore(labelMore);
        tabDashboard.setIconNavigateBefore(iconNavigateBefore);
        tabDashboard.setIconNavigateNext(iconNavigateNext);
        tabDashboard.setIconTimelapse(iconTimelapse);
        tabDashboard.setIconMasks(iconMasks);
        tabDashboard.setIconLuggage(iconLuggage);
        tabDashboard.setIconFlag(iconFlag);
        tabDashboard.setIconLogout(iconLogout);
        tabDashboard.setLabelHalfDay(labelHalfDay);
        tabDashboard.setLabelAllDay(labelAllDay);
        tabDashboard.setLabelApproved(labelApproved);
        tabDashboard.setLabelPending(labelPending);
        tabDashboard.setLabelRejected(labelRejected);
        tabDashboard.setLabelNoHolidayLeaveList(labelNoHolidayLeaveList);
        labelsLeaveModule.setTabDashboard(tabDashboard);

        TabNewRequest tabNewRequest = new TabNewRequest();
        tabNewRequest.setLabelTab(newRequestLabelTab);
        tabNewRequest.setLabelFormHeading(labelFormHeading);
        tabNewRequest.setFinancialYearStartDate(financialYearStartDate);
        tabNewRequest.setFinancialYearEndDate(financialYearEndDate);
        tabNewRequest.setLabelLeaveType(labelLeaveType);
        tabNewRequest.setLabelLeaveBalance(labelLeaveBalance);
        tabNewRequest.setLabelStartDate(labelStartDate);
        tabNewRequest.setLabelEndDate(labelEndDate);
        tabNewRequest.setLabelDays(labelDays);
        tabNewRequest.setLabelLeaveDuration(labelLeaveDuration);
        tabNewRequest.setLabelReturningToWork(labelReturningToWork);
        tabNewRequest.setLabelDateOfDelivery(labelDateOfDelivery);
        tabNewRequest.setLabelEmployeeChildAge(labelEmployeeChildAge);
        tabNewRequest.setLabelDateOfRelocation(labelDateOfRelocation);
        tabNewRequest.setLabelExpectedDateOfChild(labelExpectedDateOfChild);
        tabNewRequest.setLabelLeaveReason(labelLeaveReason);
        tabNewRequest.setMaxCharLengthLeaveReason(maxCharLengthLeaveReason);
        tabNewRequest.setLabelUploadDocument(labelUploadDocument);
        tabNewRequest.setBtnReset(btnReset);
        tabNewRequest.setBtnSubmit(btnSubmit);
        tabNewRequest.setIconArticle(iconArticle);
        tabNewRequest.setIconClose(iconClose);
        tabNewRequest.setLabelLeaveReasonPlaceholder(labelLeaveReasonPlaceholder);
        tabNewRequest.setLabelMandatoryFieldErrorMsg(labelMandatoryFieldErrorMsg);
        tabNewRequest.setLabelMandatoryDocumentErrorMsg(labelMandatoryDocumentErrorMsg);
        tabNewRequest.setLabelWrongDocumentTypeOrSizeErrorMsg(labelWrongDocumentTypeOrSizeErrorMsg);
        tabNewRequest.setLabelDoubleFileExtensionErrorMsg(labelDoubleFileExtensionErrorMsg);
        tabNewRequest.setLabelApprovedPendingLeaveCancellationErrorMsg(labelApprovedPendingLeaveCancellationErrorMsg);
        tabNewRequest.setIconDelete(iconDeleteNewRequest);
        tabNewRequest.setLabelDelete(labelDelete);
        tabNewRequest.setIconView(iconView);
        tabNewRequest.setLabelView(labelView);
        tabNewRequest.setLabelCompoffDate(labelCompoffDate);
        tabNewRequest.setLabelMiscarriageDate(labelMiscarriageDate);
        tabNewRequest.setLabelExpectedOrActualDateOfChildBirth(labelExpectedOrActualDateOfChildBirth);
        tabNewRequest.setLabelFileUploadingMultipleTimesError(labelFileUploadingMultipleTimesError);
        tabNewRequest.setLabelApproverComment(labelApproverComment);

        labelsLeaveModule.setTabNewRequest(tabNewRequest);

        UploadDocument uploadDocument = new UploadDocument();
        uploadDocument.setIconCloudUpload(iconCloudUpload);
        uploadDocument.setLabelDragDropFiles(labelDragDropFiles);    
        uploadDocument.setLabelBrowse(labelBrowse);    
        uploadDocument.setLabelDescriptionOne(labelDescriptionOne);    
        uploadDocument.setLabelDescriptionTwo(labelDescriptionTwo);    
        uploadDocument.setIconCloudUploadMobile(iconCloudUploadMobile);    
        uploadDocument.setBtnUploadDocument(btnUploadDocument);    
        uploadDocument.setLabelUploading(labelUploading);    
        uploadDocument.setLabelUploaded(labelUploaded);    
        uploadDocument.setLabelProgressIndicator(labelProgressIndicator);    
        uploadDocument.setIconArticle(uploadIconArticle);
        uploadDocument.setIconClose(uploadIconClose);
        labelsLeaveModule.setUploadDocument(uploadDocument);

        TabRequestedLeave tabRequestedLeave = new TabRequestedLeave();
        tabRequestedLeave.setLabelTab(requestedLeaveLabelTab);
        tabRequestedLeave.setBtnPending(btnPending);
        tabRequestedLeave.setIconPending(iconPending);
        tabRequestedLeave.setBtnApproved(btnApproved);
        tabRequestedLeave.setIconApproved(iconApproved);
        tabRequestedLeave.setBtnRejected(btnRejected);
        tabRequestedLeave.setIconRejected(iconRejected);
        tabRequestedLeave.setLabelLeaveType(labelLeaveTypeTabRequested);
        tabRequestedLeave.setLabelDateFrom(labelDateFrom);
        tabRequestedLeave.setLabelDateTo(labelDateTo);
        tabRequestedLeave.setLabelRequestDays(labelRequestDays);
        tabRequestedLeave.setLabelSubmittedDate(labelSubmittedDate);
        tabRequestedLeave.setLabelApprovedDate(labelApprovedDate);
        tabRequestedLeave.setLabelRejectedDate(labelRejectedDate);
        tabRequestedLeave.setBtnViewEdit(btnViewEdit);
        tabRequestedLeave.setBtnView(btnView);
        tabRequestedLeave.setIconArrowDropUp(iconArrowDropUp);
        tabRequestedLeave.setIconArrowDropDown(iconArrowDropDown);
        labelsLeaveModule.setTabRequestedLeave(tabRequestedLeave);

        DialogViewEdit dialogViewEdit = new DialogViewEdit();
        dialogViewEdit.setLabelDialogViewEdit(labelDialogViewEdit);
        dialogViewEdit.setLabelDialogView(labelDialogView);
        dialogViewEdit.setLabelApprovalStatus(labelApprovalStatus);
        dialogViewEdit.setLabelCreatedOn(labelCreatedOn);
        dialogViewEdit.setLabelUploadedDocuments(labelUploadedDocuments);
        dialogViewEdit.setIconDelete(iconDelete);
        dialogViewEdit.setBtnDeleteLeave(btnDeleteLeave);
        dialogViewEdit.setBtnCancelEdit(btnCancelEdit);
        dialogViewEdit.setBtnSave(btnSave);
        labelsLeaveModule.setDialogViewEdit(dialogViewEdit);

        DialogDeleteLeave dialogDeleteLeave = new DialogDeleteLeave();
        dialogDeleteLeave.setLabelDialogDeleteLeave(labelDialogDeleteLeave);
        dialogDeleteLeave.setIconClose(iconCloseDeleteLeave);
        dialogDeleteLeave.setLabelDeleteConfirmation(labelDeleteConfirmation);
        dialogDeleteLeave.setBtnCancel(btnCancel);
        dialogDeleteLeave.setBtnDelete(btnDelete);
        labelsLeaveModule.setDialogDeleteLeave(dialogDeleteLeave);

        AnalyticsInfo analyticsInfo = new AnalyticsInfo();
        analyticsInfo.setCountryCode(countryCode);
        analyticsInfo.setCountryName(countryName);
        analyticsInfo.setLanguage(language);
        analyticsInfo.setPageName(pageName);
        analyticsInfo.setPageType(pageType);
        analyticsInfo.setServer(server);
        analyticsInfo.setSiteName(siteName);
        labelsLeaveModule.setAnalyticsInfo(analyticsInfo);

    }

    @Override
    public String getExportedType() {
        return LeavePageComponentModelImpl.RESOURCE_TYPE;
    }

    @Override
    public LabelsLeaveModule getLabelsLeaveModule() {
        return labelsLeaveModule;
    }
    
}
