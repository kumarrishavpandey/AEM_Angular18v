package org.myai.core.beans.leave;

import java.io.Serializable;

public class DialogDeleteLeave implements Serializable {
    
    private String labelDialogDeleteLeave;

    private String iconClose;

    private String labelDeleteConfirmation;

    private String btnCancel;

    private String btnDelete;

    public String getLabelDialogDeleteLeave() {
        return labelDialogDeleteLeave;
    }

    public void setLabelDialogDeleteLeave(String labelDialogDeleteLeave) {
        this.labelDialogDeleteLeave = labelDialogDeleteLeave;
    }

    public String getIconClose() {
        return iconClose;
    }

    public void setIconClose(String iconClose) {
        this.iconClose = iconClose;
    }

    public String getLabelDeleteConfirmation() {
        return labelDeleteConfirmation;
    }

    public void setLabelDeleteConfirmation(String labelDeleteConfirmation) {
        this.labelDeleteConfirmation = labelDeleteConfirmation;
    }

    public String getBtnCancel() {
        return btnCancel;
    }

    public void setBtnCancel(String btnCancel) {
        this.btnCancel = btnCancel;
    }

    public String getBtnDelete() {
        return btnDelete;
    }

    public void setBtnDelete(String btnDelete) {
        this.btnDelete = btnDelete;
    }


    
}
