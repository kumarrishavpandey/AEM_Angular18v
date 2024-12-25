package org.myai.core.beans.homepage;

import java.io.Serializable;

public class AwardsAndAppreciationsLabels implements Serializable {

	private String awardtitle;

	private String ctaText;

	private String noDataTextAward;

	public String getTitle() {
		return awardtitle;
	}

	public void setAwardTitle(String awardtitle) {
		this.awardtitle = awardtitle;
	}

	public String getCtaText() {
		return ctaText;
	}

	public void setCtaText(String ctaText) {
		this.ctaText = ctaText;
	}

	public String getNoDataText() {
		return noDataTextAward;
	}

	public void setNoDataText(String noDataTextAward) {
		this.noDataTextAward = noDataTextAward;
	}

}
