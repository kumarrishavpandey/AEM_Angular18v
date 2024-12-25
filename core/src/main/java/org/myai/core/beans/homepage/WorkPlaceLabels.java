package org.myai.core.beans.homepage;

import java.io.Serializable;

public class WorkPlaceLabels implements Serializable {

	private String title;

	private String seeMoreBtnText;

	private String ago;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSeeMoreTextBTn() {
		return seeMoreBtnText;
	}

	public void setSeeMoreBtnText(String seeMoreBtnText) {
		this.seeMoreBtnText = seeMoreBtnText;
	}

	/**
	 * @return String return the ago
	 */
	public String getAgo() {
		return ago;
	}

	/**
	 * @param ago the ago to set
	 */
	public void setAgo(String ago) {
		this.ago = ago;
	}

}
