package org.myai.core.models.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HomePageCardDetails {

    @ValueMapValue
    private String id;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String unitColor;

    @ValueMapValue
    private String subTitle;

    @ValueMapValue
    private String cardcolor;

    @ValueMapValue
    private String icon;

    @ValueMapValue
    private String gradient1Color;

    @ValueMapValue
    private String gradient2Color;

    @ValueMapValue
    private String gradient3Color;

    @ValueMapValue
    private String gradient4Color;

    @ValueMapValue
    private String infoText;

    @ValueMapValue
    private String infoTextTooltip;

    @ValueMapValue
    private String infoIcon;

    @ValueMapValue
    private String zeroDataSubtitle;

    @ValueMapValue
    private String zeroDataInfoText;

    @ValueMapValue
    private String dataUnit;

    @ValueMapValue
    private String dataUnitMins;

    @ValueMapValue
    private String dataUnitHrs;

    @ChildResource(name = "unitArray")
    private List<HomePageUnitArray> unitArray;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUnitColor() {
        return unitColor;
    }

    public void setUnitColor(String unitColor) {
        this.unitColor = unitColor;
    }

    /**
     * @return String return the subTitle
     */
    public String getSubTitle() {
        return subTitle;
    }

    /**
     * @param subTitle the subTitle to set
     */
    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    /**
     * @return String return the cardcolor
     */
    public String getCardcolor() {
        return cardcolor;
    }

    /**
     * @param cardcolor the cardcolor to set
     */
    public void setCardcolor(String cardcolor) {
        this.cardcolor = cardcolor;
    }

    /**
     * @return String return the icon
     */
    public String getIcon() {
        return icon;
    }

    /**
     * @param icon the icon to set
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

    /**
     * @return String return the gradient1Color
     */
    public String getGradient1Color() {
        return gradient1Color;
    }

    /**
     * @param gradient1Color the gradient1Color to set
     */
    public void setGradient1Color(String gradient1Color) {
        this.gradient1Color = gradient1Color;
    }

    /**
     * @return String return the gradient2Color
     */
    public String getGradient2Color() {
        return gradient2Color;
    }

    /**
     * @param gradient2Color the gradient2Color to set
     */
    public void setGradient2Color(String gradient2Color) {
        this.gradient2Color = gradient2Color;
    }

    /**
     * @return String return the gradient3Color
     */
    public String getGradient3Color() {
        return gradient3Color;
    }

    /**
     * @param gradient3Color the gradient3Color to set
     */
    public void setGradient3Color(String gradient3Color) {
        this.gradient3Color = gradient3Color;
    }

    /**
     * @return String return the gradient4Color
     */
    public String getGradient4Color() {
        return gradient4Color;
    }

    /**
     * @param gradient4Color the gradient4Color to set
     */
    public void setGradient4Color(String gradient4Color) {
        this.gradient4Color = gradient4Color;
    }

    /**
     * @return String return the infoText
     */
    public String getInfoText() {
        return infoText;
    }

    /**
     * @param infoText the infoText to set
     */
    public void setInfoText(String infoText) {
        this.infoText = infoText;
    }

    /**
     * @return String return the infoTextTooltip
     */
    public String getInfoTextTooltip() {
        return infoTextTooltip;
    }

    /**
     * @param infoTextTooltip the infoTextTooltip to set
     */
    public void setInfoTextTooltip(String infoTextTooltip) {
        this.infoTextTooltip = infoTextTooltip;
    }

    /**
     * @return String return the infoIcon
     */
    public String getInfoIcon() {
        return infoIcon;
    }

    /**
     * @param infoIcon the infoIcon to set
     */
    public void setInfoIcon(String infoIcon) {
        this.infoIcon = infoIcon;
    }

    /**
     * @return String return the zeroDataSubtitle
     */
    public String getZeroDataSubtitle() {
        return zeroDataSubtitle;
    }

    /**
     * @param zeroDataSubtitle the zeroDataSubtitle to set
     */
    public void setZeroDataSubtitle(String zeroDataSubtitle) {
        this.zeroDataSubtitle = zeroDataSubtitle;
    }

    /**
     * @return String return the zeroDataInfoText
     */
    public String getZeroDataInfoText() {
        return zeroDataInfoText;
    }

    /**
     * @param zeroDataInfoText the zeroDataInfoText to set
     */
    public void setZeroDataInfoText(String zeroDataInfoText) {
        this.zeroDataInfoText = zeroDataInfoText;
    }

    /**
     * @return List<HomePageUnitArray> return the unitArrays
     */
    public List<HomePageUnitArray> getUnitArray() {
        if (null != unitArray && !unitArray.isEmpty())
            return new ArrayList<>(unitArray);
        else
            return new ArrayList<>();
    }

    /**
     * @param unitArrays the unitArrays to set
     */
    public void setUnitArray(List<HomePageUnitArray> unitArray) {
        if (null != unitArray && !unitArray.isEmpty())
            this.unitArray = new ArrayList<>(unitArray);
    }

    public String getDataUnit() {
        return dataUnit;
    }

    public void setDataUnit(String dataUnit) {
        this.dataUnit = dataUnit;
    }

    public String getDataUnitMins() {
        return dataUnitMins;
    }

    public void setDataUnitMins(String dataUnitMins) {
        this.dataUnitMins = dataUnitMins;
    }

    public String getDataUnitHrs() {
        return dataUnitHrs;
    }

    public void setDataUnitHrs(String dataUnitHrs) {
        this.dataUnitHrs = dataUnitHrs;
    }

}