package org.myai.core.beans.homepage;

import java.io.Serializable;

public class UpComingLabels implements Serializable {

	private String upcomingTitle;

	private String btnText;

	private String noDataTitle;

	private String noDataDesc;

	private String viewMoreIcon;

	private String closeIcon;

	private UpcomingLearningCalendarList upcomingLearningCalendarList;

	private UpComingHolidayResBean upComingHolidayResBean;

	private UpComingBirthDayList upComingBirthDayList;

	private UpComingCrewList upComingCrewList;

	private UpComingCrewAlertList upComingCrewAlertList;

	private UpcomingDocNames upcomingDocNames;

	public String getTitle() {
		return upcomingTitle;
	}

	public void setTitle(String upcomingTitle) {
		this.upcomingTitle = upcomingTitle;
	}

	public String getBtnText() {
		return btnText;
	}

	public void setBtnText(String btnText) {
		this.btnText = btnText;
	}

	public UpcomingLearningCalendarList getLearningCalendarList() {
		return upcomingLearningCalendarList;
	}

	public void setLearningCalendarList(UpcomingLearningCalendarList upcomingLearningCalendarList) {
		this.upcomingLearningCalendarList = upcomingLearningCalendarList;
	}

	/**
	 * @return String return the noDataTitle
	 */
	public String getNoDataTitle() {
		return noDataTitle;
	}

	/**
	 * @param noDataTitle the noDataTitle to set
	 */
	public void setNoDataTitle(String noDataTitle) {
		this.noDataTitle = noDataTitle;
	}

	/**
	 * @return String return the noDataDesc
	 */
	public String getNoDataDesc() {
		return noDataDesc;
	}

	/**
	 * @param noDataDesc the noDataDesc to set
	 */
	public void setNoDataDesc(String noDataDesc) {
		this.noDataDesc = noDataDesc;
	}

	/**
	 * @return String return the viewMoreIcon
	 */
	public String getViewMoreIcon() {
		return viewMoreIcon;
	}

	/**
	 * @param viewMoreIcon the viewMoreIcon to set
	 */
	public void setViewMoreIcon(String viewMoreIcon) {
		this.viewMoreIcon = viewMoreIcon;
	}

	/**
	 * @return String return the closeIcon
	 */
	public String getCloseIcon() {
		return closeIcon;
	}

	/**
	 * @param closeIcon the closeIcon to set
	 */
	public void setCloseIcon(String closeIcon) {
		this.closeIcon = closeIcon;
	}

	/**
	 * @return UpComingHolidayResBean return the uComingHolidayResBean
	 */
	public UpComingHolidayResBean getHolidaysList() {
		return upComingHolidayResBean;
	}

	/**
	 * @param uComingHolidayResBean the uComingHolidayResBean to set
	 */
	public void setHolidaysList(UpComingHolidayResBean upComingHolidayResBean) {
		this.upComingHolidayResBean = upComingHolidayResBean;
	}

	/**
	 * @return UpComingBirthDayList return the upComingBirthDayList
	 */
	public UpComingBirthDayList getTeamBirthdaysList() {
		return upComingBirthDayList;
	}

	/**
	 * @param upComingBirthDayList the upComingBirthDayList to set
	 */
	public void setTeamBirthdaysList(UpComingBirthDayList upComingBirthDayList) {
		this.upComingBirthDayList = upComingBirthDayList;
	}

	public UpComingCrewList getCrewList() {
		return upComingCrewList;
	}

	public void setCrewList(UpComingCrewList upComingCrewList) {
		this.upComingCrewList = upComingCrewList;
	}

	public UpComingCrewAlertList getCrewAlertList() {
		return upComingCrewAlertList;
	}

	public void setCrewAlertList(UpComingCrewAlertList upComingCrewAlertList) {
		this.upComingCrewAlertList = upComingCrewAlertList;
	}

	public UpcomingDocNames getDocNames() {
		return upcomingDocNames;
	}

	public void setDocNames(UpcomingDocNames upcomingDocNames) {
		this.upcomingDocNames = upcomingDocNames;
	}

	

}
