package org.myai.core.beans.homepage;

import java.io.Serializable;

public class RoasterResBean implements Serializable {

    private String roastertitle;

    private String noData;

    private String viewMore;

    private String viewLess;

    private String durationText;

    private String flightNoTxt;

    private String errorTxt;

    private String noDataTitle;

    private String noDataDesc;

    /**
     * @return String return the roastertitle
     */
    public String getTitle() {
        return roastertitle;
    }

    /**
     * @param roastertitle the roastertitle to set
     */
    public void setTitle(String roastertitle) {
        this.roastertitle = roastertitle;
    }

    /**
     * @return String return the noData
     */
    public String getNoData() {
        return noData;
    }

    /**
     * @param noData the noData to set
     */
    public void setNoData(String noData) {
        this.noData = noData;
    }

    /**
     * @return String return the viewMore
     */
    public String getViewMore() {
        return viewMore;
    }

    /**
     * @param viewMore the viewMore to set
     */
    public void setViewMore(String viewMore) {
        this.viewMore = viewMore;
    }

    /**
     * @return String return the viewLess
     */
    public String getViewLess() {
        return viewLess;
    }

    /**
     * @param viewLess the viewLess to set
     */
    public void setViewLess(String viewLess) {
        this.viewLess = viewLess;
    }

    /**
     * @return String return the durationText
     */
    public String getDurationText() {
        return durationText;
    }

    /**
     * @param durationText the durationText to set
     */
    public void setDurationText(String durationText) {
        this.durationText = durationText;
    }

    /**
     * @return String return the flightNoTxt
     */
    public String getFlightNoTxt() {
        return flightNoTxt;
    }

    /**
     * @param flightNoTxt the flightNoTxt to set
     */
    public void setFlightNoTxt(String flightNoTxt) {
        this.flightNoTxt = flightNoTxt;
    }

    /**
     * @return String return the errorTxt
     */
    public String getErrorTxt() {
        return errorTxt;
    }

    /**
     * @param errorTxt the errorTxt to set
     */
    public void setErrorTxt(String errorTxt) {
        this.errorTxt = errorTxt;
    }

    public String getNoDataTitle() {
        return noDataTitle;
    }

    public void setNoDataTitle(String noDataTitle) {
        this.noDataTitle = noDataTitle;
    }

    public String getNoDataDesc() {
        return noDataDesc;
    }

    public void setNoDataDesc(String noDataDesc) {
        this.noDataDesc = noDataDesc;
    }

}
