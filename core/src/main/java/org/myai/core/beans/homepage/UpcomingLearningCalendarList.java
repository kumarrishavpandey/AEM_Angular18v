package org.myai.core.beans.homepage;

import java.io.Serializable;

public class UpcomingLearningCalendarList implements Serializable {

    private String learningCalendarListName;

    private String summary;

    private String duration;

    private String icon;

    private String iconColor;

    private String iconBgColor;

    private boolean isExternal;

    private String externalLink;

    private String mobilenavlink;

    private String criticality;

    public String getName() {
        return learningCalendarListName;
    }

    public void setName(String learningCalendarListName) {
        this.learningCalendarListName = learningCalendarListName;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getIconColor() {
        return iconColor;
    }

    public void setIconColor(String iconColor) {
        this.iconColor = iconColor;
    }

    public String getIconBgColor() {
        return iconBgColor;
    }

    public void setIconBgColor(String iconBgColor) {
        this.iconBgColor = iconBgColor;
    }

    public boolean getIsExternal() {
        return isExternal;
    }

    public void setIsExternal(boolean isExternal) {
        this.isExternal = isExternal;
    }

    public String getExternalLink() {
        return externalLink;
    }

    public void setExternalLink(String externalLink) {
        this.externalLink = externalLink;
    }

    public String getMobilenavlink() {
        return mobilenavlink;
    }

    public void setMobilenavlink(String mobilenavlink) {
        this.mobilenavlink = mobilenavlink;
    }

    public String getCriticality() {
        return criticality;
    }

    public void setCriticality(String criticality) {
        this.criticality = criticality;
    }

}