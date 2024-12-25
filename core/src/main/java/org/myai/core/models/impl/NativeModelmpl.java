package org.myai.core.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.myai.core.models.NativeModel;

import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;

@Model(adaptables = SlingHttpServletRequest.class, adapters = NativeModel.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
resourceType = "myai/components/testcomponent")
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class NativeModelmpl implements NativeModel{

    @ValueMapValue
    private String textData;

    @ValueMapValue
    private String imagePath;

    @Override
    public String getTextData() {
        return textData;
    }

    @Override
    public String getImagePath() {
        return imagePath;
    }
    
}
