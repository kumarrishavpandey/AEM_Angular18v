package org.myai.core.beans.homepage;

import java.io.Serializable;

public class UpComingLearningCalender implements Serializable {

	private String duration;

	private String iconBgColor;

	private boolean isExternal;

	private String externalLink;

	private String icon;

	private String iconColor;

	private String criticality;

	private String name;

	private String summary;

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
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

	public String getCriticality() {
		return criticality;
	}

	public void setCriticality(String criticality) {
		this.criticality = criticality;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

}
