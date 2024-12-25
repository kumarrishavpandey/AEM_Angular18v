package org.myai.core.beans.homepage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.myai.core.models.impl.UpcomingFlyingDetails;

public class UpcomingFlyCrew implements Serializable {

	private transient List<UpcomingFlyingDetails> upcomingFlyingDetails;

	public List<UpcomingFlyingDetails> getUpcomingFlyingDetails() {
		return new ArrayList<>(upcomingFlyingDetails);
	}

	public void setUpcomingFlyingDetails(List<UpcomingFlyingDetails> upcomingFlyingDetails) {
		this.upcomingFlyingDetails = new ArrayList<>(upcomingFlyingDetails);
	}

}
