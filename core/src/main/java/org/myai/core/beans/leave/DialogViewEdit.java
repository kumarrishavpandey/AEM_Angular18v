package org.myai.core.beans.leave;

import java.io.Serializable;

public class DialogViewEdit implements Serializable {
    
    private String labelDialogViewEdit;

    private String labelDialogView;

    private String labelApprovalStatus;

    private String labelCreatedOn;

    private String labelUploadedDocuments;

    private String iconDelete;

    private String btnDeleteLeave;

    private String btnCancelEdit;

    private String btnSave;

    public String getLabelDialogViewEdit() {
        return labelDialogViewEdit;
    }

    public void setLabelDialogViewEdit(String labelDialogViewEdit) {
        this.labelDialogViewEdit = labelDialogViewEdit;
    }

    public String getLabelDialogView() {
        return labelDialogView;
    }

    public void setLabelDialogView(String labelDialogView) {
        this.labelDialogView = labelDialogView;
    }

    public String getLabelApprovalStatus() {
        return labelApprovalStatus;
    }

    public void setLabelApprovalStatus(String labelApprovalStatus) {
        this.labelApprovalStatus = labelApprovalStatus;
    }

    public String getLabelCreatedOn() {
        return labelCreatedOn;
    }

    public void setLabelCreatedOn(String labelCreatedOn) {
        this.labelCreatedOn = labelCreatedOn;
    }

    public String getLabelUploadedDocuments() {
        return labelUploadedDocuments;
    }

    public void setLabelUploadedDocuments(String labelUploadedDocuments) {
        this.labelUploadedDocuments = labelUploadedDocuments;
    }

    public String getIconDelete() {
        return iconDelete;
    }

    public void setIconDelete(String iconDelete) {
        this.iconDelete = iconDelete;
    }

    public String getBtnDeleteLeave() {
        return btnDeleteLeave;
    }

    public void setBtnDeleteLeave(String btnDeleteLeave) {
        this.btnDeleteLeave = btnDeleteLeave;
    }

    public String getBtnCancelEdit() {
        return btnCancelEdit;
    }

    public void setBtnCancelEdit(String btnCancelEdit) {
        this.btnCancelEdit = btnCancelEdit;
    }

    public String getBtnSave() {
        return btnSave;
    }

    public void setBtnSave(String btnSave) {
        this.btnSave = btnSave;
    }

    
}
