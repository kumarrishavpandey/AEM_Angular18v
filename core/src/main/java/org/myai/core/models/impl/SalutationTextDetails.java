package org.myai.core.models.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SalutationTextDetails {

    @ValueMapValue
    private String goodMorning;

    @ValueMapValue
    private String goodAfternoon;

    @ValueMapValue
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