package org.myai.core.models;

import org.myai.core.beans.leave.LabelsLeaveModule;

import com.adobe.cq.export.json.ComponentExporter;

public interface LeavePageComponentModel extends ComponentExporter {
    public LabelsLeaveModule getLabelsLeaveModule();
}
