package org.myai.core.beans.homepage;

import java.io.Serializable;

public class BannerSalutationResBean implements Serializable {

	private String goodMorning;

	private String goodAfternoon;
	
	private String goodEvening;

	public String getGoodMorning() {
		return goodMorning;
	}

	public void setGoodMorning(String goodMorning) {
		this.goodMorning = goodMorning;
	}

	public String getGoodAfternoon() {
		return goodAfternoon;
	}

	public void setGoodAfternoon(String goodAfternoon) {
		this.goodAfternoon = goodAfternoon;
	}

	public String getGoodEvening() {
		return goodEvening;
	}

	public void setGoodEvening(String goodEvening) {
		this.goodEvening = goodEvening;
	}

}
