package org.myai.core.beans.homepage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.myai.core.models.impl.SalutationPersonaDetails;

public class BannerLabels implements Serializable {

    private BannerDefualtResBean fixedBanner;

    private transient List<SalutationPersonaDetails> salutationPersonaDetails;

    public BannerDefualtResBean getFixedBanner() {
        return fixedBanner;
    }

    public void setFixedBanner(BannerDefualtResBean bannerDefualtResBean) {
        this.fixedBanner = bannerDefualtResBean;
    }

    public List<SalutationPersonaDetails> getSalutationPersonaDetails() {
        return new ArrayList<>(salutationPersonaDetails);
    }

    public void setSalutationPersonaDetails(List<SalutationPersonaDetails> salutationPersonaDetails) {
        this.salutationPersonaDetails = new ArrayList<>(salutationPersonaDetails);
    }

}
