package org.myai.core.beans.homepage;

import java.io.Serializable;

public class QuickActionLabels implements Serializable {

	private String title;

	private String quickAction;

	private String personalizedNav;


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getQuickAction() {
		return quickAction;
	}

	public void setQuickAction(String quickAction) {
		this.quickAction = quickAction;
	}

	public String getPersonalizedNav() {
		return personalizedNav;
	}

	public void setPersonalizedNav(String personalizedNav) {
		this.personalizedNav = personalizedNav;
	}

	

}
