package org.myai.core.models.impl;

import javax.annotation.PostConstruct;

import org.myai.core.beans.RishavBean;
import org.myai.core.models.Rishav;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { Rishav.class,
        ComponentExporter.class }, resourceType = RishavImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RishavImpl implements Rishav {

    static final String RESOURCE_TYPE = "myai/components/rishav";

    @ValueMapValue
    private String rishavtext;

    @ValueMapValue
    private String rishavimage;

    private RishavBean rishavBean;

    @PostConstruct
    protected void init() {

        rishavBean = new RishavBean();
        rishavBean.setText(rishavtext);
        rishavBean.setImage(rishavimage);

    }

    @Override
    public String getExportedType() {
        return RishavImpl.RESOURCE_TYPE;
    }

    @Override
    public RishavBean getRishavData() {
        return rishavBean;
    }

}
