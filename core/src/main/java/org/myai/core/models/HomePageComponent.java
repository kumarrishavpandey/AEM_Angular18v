package org.myai.core.models;

import org.myai.core.beans.homepage.HomePageResBean;

import com.adobe.cq.export.json.ComponentExporter;

public interface HomePageComponent extends ComponentExporter {

    public HomePageResBean getHomePageDetails();

}