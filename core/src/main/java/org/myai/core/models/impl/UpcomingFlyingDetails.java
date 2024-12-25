package org.myai.core.models.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UpcomingFlyingDetails {

    @ValueMapValue
    private String key;

    @ValueMapValue
    private String documentName;

    @ValueMapValue
    private String expiryTime;

    @ValueMapValue
    private String upFlyDuration;

    @ValueMapValue
    private String redirectionUrlPath;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(String expiryTime) {
        this.expiryTime = expiryTime;
    }

    public String getUpFlyDuration() {
        return upFlyDuration;
    }

    public void setUpFlyDuration(String upFlyDuration) {
        this.upFlyDuration = upFlyDuration;
    }

    public String getRedirectionUrlPath() {
        return redirectionUrlPath;
    }

    public void setRedirectionUrlPath(String redirectionUrlPath) {
        this.redirectionUrlPath = redirectionUrlPath;
    }

}
