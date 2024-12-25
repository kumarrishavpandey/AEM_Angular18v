package org.myai.core.beans.homepage;

import java.io.Serializable;

public class UpComingCrewList implements Serializable {

    private String crewListNoDataTitle;

    private String crewListNoDataDesc;

    public String getNoDataTitle() {
        return crewListNoDataTitle;
    }

    public void setNoDataTitle(String crewListNoDataTitle) {
        this.crewListNoDataTitle = crewListNoDataTitle;
    }

    public String getNoDataDesc() {
        return crewListNoDataDesc;
    }

    public void setNoDataDesc(String crewListNoDataDesc) {
        this.crewListNoDataDesc = crewListNoDataDesc;
    }

}