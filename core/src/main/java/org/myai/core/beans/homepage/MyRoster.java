package org.myai.core.beans.homepage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.myai.core.models.impl.HomePageRoasterDetails;

public class MyRoster implements Serializable {

	private String roasterTitle;

	private transient List<HomePageRoasterDetails> currentRoaster;

	public String getRoasterTitle() {
		return roasterTitle;
	}

	public void setRoasterTitle(String roasterTitle) {
		this.roasterTitle = roasterTitle;
	}

	public List<HomePageRoasterDetails> getCurrentRoaster() {
		return new ArrayList<>(currentRoaster);
	}

	public void setCurrentRoaster(List<HomePageRoasterDetails> currentRoaster) {
		this.currentRoaster = new ArrayList<>(currentRoaster);
	}

}
