package org.myai.core.beans.leave;

import java.io.Serializable;

import org.myai.core.beans.common.AnalyticsInfo;

public class LabelsLeaveModule implements Serializable {

    private String pageTitle;

    private TabDashboard tabDashboard;

    private TabNewRequest tabNewRequest;

    private UploadDocument uploadDocument;

    private TabRequestedLeave tabRequestedLeave;

    private DialogViewEdit dialogViewEdit;

    private DialogDeleteLeave dialogDeleteLeave;

    private AnalyticsInfo analyticsInfo;

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public TabDashboard getTabDashboard() {
        return tabDashboard;
    }

    public void setTabDashboard(TabDashboard tabDashboard) {
        this.tabDashboard = tabDashboard;
    }

    public TabNewRequest getTabNewRequest() {
        return tabNewRequest;
    }

    public void setTabNewRequest(TabNewRequest tabNewRequest) {
        this.tabNewRequest = tabNewRequest;
    }

    public UploadDocument getUploadDocument() {
        return uploadDocument;
    }

    public void setUploadDocument(UploadDocument uploadDocument) {
        this.uploadDocument = uploadDocument;
    }

    public TabRequestedLeave getTabRequestedLeave() {
        return tabRequestedLeave;
    }

    public void setTabRequestedLeave(TabRequestedLeave tabRequestedLeave) {
        this.tabRequestedLeave = tabRequestedLeave;
    }

    public DialogViewEdit getDialogViewEdit() {
        return dialogViewEdit;
    }

    public void setDialogViewEdit(DialogViewEdit dialogViewEdit) {
        this.dialogViewEdit = dialogViewEdit;
    }

    public DialogDeleteLeave getDialogDeleteLeave() {
        return dialogDeleteLeave;
    }

    public void setDialogDeleteLeave(DialogDeleteLeave dialogDeleteLeave) {
        this.dialogDeleteLeave = dialogDeleteLeave;
    }

    public AnalyticsInfo getAnalyticsInfo() {
        return analyticsInfo;
    }

    public void setAnalyticsInfo(AnalyticsInfo analyticsInfo) {
        this.analyticsInfo = analyticsInfo;
    }
}
