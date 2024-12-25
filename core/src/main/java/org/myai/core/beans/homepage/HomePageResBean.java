package org.myai.core.beans.homepage;

import java.io.Serializable;

import org.myai.core.beans.common.AnalyticsInfo;

public class HomePageResBean implements Serializable {

	private QuickActionLabels quickActionLabels;

	private AwardsAndAppreciationsLabels awardsAndAppreciationsLabels;

	private UpComingLabels upComingLabels;

	private WorkPlaceLabels workPlaceLabels;

	private MyBoardLabels myBoardLabels;

	private RoasterResBean roasterResBean;

	private BannerLabels bannerLabels;

	private AnalyticsInfo analyticsInfo;

	public QuickActionLabels getQuickActionLabels() {
		return quickActionLabels;
	}

	public void setQuickActionLabels(QuickActionLabels quickActionLabels) {
		this.quickActionLabels = quickActionLabels;
	}

	public AwardsAndAppreciationsLabels getAwardsAndAppreciationsLabels() {
		return awardsAndAppreciationsLabels;
	}

	public void setAwardsAndAppreciationsLabels(AwardsAndAppreciationsLabels awardsAndAppreciationsLabels) {
		this.awardsAndAppreciationsLabels = awardsAndAppreciationsLabels;
	}

	public UpComingLabels getUpComingLabels() {
		return upComingLabels;
	}

	public void setUpComingLabels(UpComingLabels upComingLabels) {
		this.upComingLabels = upComingLabels;
	}

	public WorkPlaceLabels getWorkPlaceLabels() {
		return workPlaceLabels;
	}

	public void setWorkPlaceLabels(WorkPlaceLabels workPlaceLabels) {
		this.workPlaceLabels = workPlaceLabels;
	}

	public MyBoardLabels getMyBoardLabels() {
		return myBoardLabels;
	}

	public void setMyBoardLabels(MyBoardLabels myBoardLabels) {
		this.myBoardLabels = myBoardLabels;
	}

	public RoasterResBean getRoasterLabels() {
		return roasterResBean;
	}

	public void setRosterLabels(RoasterResBean roasterResBean) {
		this.roasterResBean = roasterResBean;
	}

	public BannerLabels getBannerLabels() {
		return bannerLabels;
	}

	public void setBannerLabels(BannerLabels bannerLabels) {
		this.bannerLabels = bannerLabels;
	}

	public AnalyticsInfo getAnalyticsInfo() {
		return analyticsInfo;
	}

	public void setAnalyticsInfo(AnalyticsInfo analyticsInfo) {
		this.analyticsInfo = analyticsInfo;
	}
}
