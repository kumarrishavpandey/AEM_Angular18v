package org.myai.core.models.impl;

import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.myai.core.beans.common.AnalyticsInfo;
import org.myai.core.beans.homepage.AwardsAndAppreciationsLabels;
import org.myai.core.beans.homepage.BannerDefualtResBean;
import org.myai.core.beans.homepage.BannerLabels;
import org.myai.core.beans.homepage.CommonErrorBean;
import org.myai.core.beans.homepage.HomePageResBean;
import org.myai.core.beans.homepage.MyBoardLabels;
import org.myai.core.beans.homepage.QuickActionLabels;
import org.myai.core.beans.homepage.RoasterResBean;
import org.myai.core.beans.homepage.UpComingBirthDayList;
import org.myai.core.beans.homepage.UpComingCrewAlertList;
import org.myai.core.beans.homepage.UpComingCrewList;
import org.myai.core.beans.homepage.UpComingHolidayResBean;
import org.myai.core.beans.homepage.UpComingLabels;
import org.myai.core.beans.homepage.UpcomingDocNames;
import org.myai.core.beans.homepage.UpcomingLearningCalendarList;
import org.myai.core.beans.homepage.WorkPlaceLabels;
import org.myai.core.models.HomePageComponent;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { HomePageComponent.class,
        ComponentExporter.class }, resourceType = HomePageComponentImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class HomePageComponentImpl implements HomePageComponent {

    static final String RESOURCE_TYPE = "myai/components/homepage-component";

    @ValueMapValue
    private String goodMorning;

    @ValueMapValue
    private String goodAfternoon;

    @ValueMapValue
    private String goodEvening;

    @ValueMapValue
    private String defaultImagePath;

    @ValueMapValue
    private String defualtImageAltText;

    @ValueMapValue
    private String defaultTitle;

    @ValueMapValue
    private String defaultDesc;

    @ValueMapValue
    private String defaultCTATitle;

    @ValueMapValue
    private String defaultCTAPath;

    @ValueMapValue
    private String zeroDataText;

    @ValueMapValue
    private String noDataText;

    @ValueMapValue
    private String tryAgainText;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String quickAction;

    @ValueMapValue
    private String personalizedNav;

    @ValueMapValue
    private String awardtitle;

    @ValueMapValue
    private String ctaText;

    @ValueMapValue
    private String noDataTextAward;

    @ValueMapValue
    private String upcomingTitle;

    @ValueMapValue
    private String btnText;

    @ValueMapValue
    private String boardTitle;

    @ValueMapValue
    private String errorText;

    @ChildResource
    private List<PersonaDetails> personaData;

    @ValueMapValue
    private String workPlacetitle;

    @ValueMapValue
    private String seeMoreBtnText;

    @ValueMapValue
    private String ago;

    @ValueMapValue
    private String learningCalendarListName;

    @ValueMapValue
    private String learningCalendarListSummary;

    @ValueMapValue
    private String learningCalendarListDuration;

    @ValueMapValue
    private String learningCalendarListIcon;

    @ValueMapValue
    private String learningCalendarListIconColor;

    @ValueMapValue
    private String learningCalendarListIconBgColor;

    @ValueMapValue
    private Boolean learningCalendarIsExternal;

    @ValueMapValue
    private String learningCalendarExternalLink;

    @ValueMapValue
    private String learningCalendarMobileExternalLink;

    @ValueMapValue
    private String learningCalendarCriticality;

    @ValueMapValue
    private String noDataTitle;

    @ValueMapValue
    private String noDataDesc;

    @ValueMapValue
    private String viewMoreIcon;

    @ValueMapValue
    private String closeIcon;

    @ValueMapValue
    private String holidaysListDuration;

    @ValueMapValue
    private String holidaysListIcon;

    @ValueMapValue
    private String holidaysListIconColor;

    @ValueMapValue
    private String holidaysListBgColor;

    @ValueMapValue
    private boolean holidaysListIsExternal;

    @ValueMapValue
    private String holidaysListExternalLink;

    @ValueMapValue
    private String holidaysListCriticality;

    @ValueMapValue
    private String teamBirthdaysTitle;

    @ValueMapValue
    private String teamBirthdaysDuration;

    @ValueMapValue
    private String teamBirthdaysIcon;

    @ValueMapValue
    private String teamBirthdaysIconColor;

    @ValueMapValue
    private String teamBirthdaysIconBgColor;

    @ValueMapValue
    private boolean teamBirthdaysIsExternal;

    @ValueMapValue
    private String teamBirthdaysExternalLink;

    @ValueMapValue
    private String teamBirthdaysCriticality;

    @ValueMapValue
    private String roastertitle;

    @ValueMapValue
    private String noData;

    @ValueMapValue
    private String viewMore;

    @ValueMapValue
    private String viewLess;

    @ValueMapValue
    private String durationText;

    @ValueMapValue
    private String flightNoTxt;

    @ValueMapValue
    private String errorTxt;

    @ValueMapValue
    private String bannerImage;

    @ValueMapValue
    private String bannerImageAltText;

    @ValueMapValue
    private String bannerTitle;

    @ValueMapValue
    private String bannerTitleColor;

    @ValueMapValue
    private String bannerDesc;

    @ValueMapValue
    private String bannerCtaText;

    @ValueMapValue
    private String bannerCtaTextColor;

    @ValueMapValue
    private String bannerCtaPath;

    @ValueMapValue
    private String bannerCtaBgColor;

    @ValueMapValue
    private String bannerDescColor;

    @ValueMapValue
    private String roasterNoDataTitle;

    @ValueMapValue
    private String roasterNoDataDesc;

    @ValueMapValue
    private String crewListNoDataTitle;

    @ValueMapValue
    private String crewListNoDataDesc;

    @ValueMapValue
    private int crewAlertListPassport;

    @ValueMapValue
    private int crewAlertListVisa;

    @ValueMapValue
    private int crewAlertListAep;

    @ValueMapValue
    private int crewAlertListTsa;

    @ValueMapValue
    private int crewAlertListAtpl;
    
    @ValueMapValue
    private int crewAlertListCpl;

    @ValueMapValue
    private int crewAlertListIrend;

    @ValueMapValue
    private int crewAlertListCmc;

    @ValueMapValue
    private int crewAlertListMedical;

    @ValueMapValue
    private int crewAlertListCa35;

    @ValueMapValue
    private int crewAlertListYf;

    @ValueMapValue
    private int crewAlertListCoid;

    @ValueMapValue
    private int crewAlertListEgca;

    @ValueMapValue
    private int crewAlertListFrto;

    @ValueMapValue
    private int crewAlertListPmr;

    @ValueMapValue
    private int crewAlertListFrro;

    @ValueMapValue
    private int crewAlertListFata;

    @ValueMapValue
    private int crewAlertListExpmed;

    @ValueMapValue
    private String coid;

    @ValueMapValue
    private String yf;

    @ValueMapValue
    private String countryCode;

    @ValueMapValue
    private String countryName;

    @ValueMapValue
    private String language;

    @ValueMapValue
    private String pageName;

    @ValueMapValue
    private String pageType;

    @ValueMapValue
    private String server;

    @ValueMapValue
    private String siteName;

    @ChildResource
    private List<SalutationPersonaDetails> salutationPersonaData;

    private HomePageResBean homePageResBean;

    @PostConstruct
    protected void init() {
        homePageResBean = new HomePageResBean();

        MyBoardLabels myBoardLabels = new MyBoardLabels();

        myBoardLabels.setTitle(boardTitle);
        myBoardLabels.setPersonaData(personaData);

        CommonErrorBean commonErrorBean = new CommonErrorBean();
        commonErrorBean.setErrorText(errorText);

        myBoardLabels.setCommonMessages(commonErrorBean);

        homePageResBean.setMyBoardLabels(myBoardLabels);

        BannerLabels bannerLabels = new BannerLabels();
        bannerLabels.setSalutationPersonaDetails(salutationPersonaData);

        BannerDefualtResBean bannerDefualtResBean = new BannerDefualtResBean();
        bannerDefualtResBean.setBannerImage(bannerImage);
        bannerDefualtResBean.setBannerImageAltText(bannerImageAltText);
        bannerDefualtResBean.setBannerTitle(bannerTitleColor);
        bannerDefualtResBean.setBannerDesc(bannerDesc);
        bannerDefualtResBean.setBannerCtaPath(bannerCtaPath);
        bannerDefualtResBean.setBannerCtaText(bannerCtaText);
        bannerDefualtResBean.setBannerCtaTextColor(bannerCtaTextColor);
        bannerDefualtResBean.setBannerCtaBgColor(bannerCtaBgColor);
        bannerDefualtResBean.setBannerDescColor(bannerDescColor);

        bannerLabels.setFixedBanner(bannerDefualtResBean);

        homePageResBean.setBannerLabels(bannerLabels);

        QuickActionLabels quickActionLabels = new QuickActionLabels();
        quickActionLabels.setTitle(title);
        quickActionLabels.setQuickAction(quickAction);
        quickActionLabels.setPersonalizedNav(personalizedNav);

        homePageResBean.setQuickActionLabels(quickActionLabels);

        AwardsAndAppreciationsLabels awardsAndAppreciationsLabels = new AwardsAndAppreciationsLabels();
        awardsAndAppreciationsLabels.setAwardTitle(awardtitle);
        awardsAndAppreciationsLabels.setCtaText(ctaText);
        awardsAndAppreciationsLabels.setNoDataText(noDataTextAward);

        homePageResBean.setAwardsAndAppreciationsLabels(awardsAndAppreciationsLabels);

        UpComingLabels upComingLabels = new UpComingLabels();
        upComingLabels.setTitle(upcomingTitle);
        upComingLabels.setBtnText(btnText);
        upComingLabels.setNoDataTitle(noDataTitle);
        upComingLabels.setNoDataDesc(noDataDesc);
        upComingLabels.setViewMoreIcon(viewMoreIcon);
        upComingLabels.setCloseIcon(closeIcon);

        homePageResBean.setUpComingLabels(upComingLabels);

        UpcomingLearningCalendarList upcomingLearningCalendarList = new UpcomingLearningCalendarList();
        upcomingLearningCalendarList.setName(learningCalendarListName);
        upcomingLearningCalendarList.setSummary(learningCalendarListSummary);
        upcomingLearningCalendarList.setDuration(learningCalendarListDuration);
        upcomingLearningCalendarList.setIcon(learningCalendarListIcon);
        upcomingLearningCalendarList.setIconColor(learningCalendarListIconColor);
        upcomingLearningCalendarList.setIconBgColor(learningCalendarListIconBgColor);
        upcomingLearningCalendarList.setIsExternal(learningCalendarIsExternal);
        upcomingLearningCalendarList.setExternalLink(learningCalendarExternalLink);
        upcomingLearningCalendarList.setCriticality(learningCalendarCriticality);
        upcomingLearningCalendarList.setMobilenavlink(learningCalendarMobileExternalLink);

        upComingLabels.setLearningCalendarList(upcomingLearningCalendarList);

        UpComingHolidayResBean upComingHolidayResBean = new UpComingHolidayResBean();
        upComingHolidayResBean.setDuration(holidaysListDuration);
        upComingHolidayResBean.setIcon(holidaysListIcon);
        upComingHolidayResBean.setIconColor(holidaysListIconColor);
        upComingHolidayResBean.setIconBgColor(holidaysListBgColor);
        upComingHolidayResBean.setIsExternal(holidaysListIsExternal);
        upComingHolidayResBean.setExternalLink(holidaysListExternalLink);
        upComingHolidayResBean.setCriticality(holidaysListCriticality);

        upComingLabels.setHolidaysList(upComingHolidayResBean);

        UpComingBirthDayList upComingBirthDayList = new UpComingBirthDayList();
        upComingBirthDayList.setTitle(teamBirthdaysTitle);
        upComingBirthDayList.setCriticality(teamBirthdaysCriticality);
        upComingBirthDayList.setDuration(teamBirthdaysDuration);
        upComingBirthDayList.setIsExternal(teamBirthdaysIsExternal);
        upComingBirthDayList.setExternalLink(teamBirthdaysExternalLink);
        upComingBirthDayList.setIcon(teamBirthdaysIcon);
        upComingBirthDayList.setIconBgColor(teamBirthdaysIconBgColor);
        upComingBirthDayList.setIconColor(teamBirthdaysIconColor);

        upComingLabels.setTeamBirthdaysList(upComingBirthDayList);

        UpComingCrewList upComingCrewList = new UpComingCrewList();
        upComingCrewList.setNoDataTitle(crewListNoDataTitle);
        upComingCrewList.setNoDataDesc(crewListNoDataDesc);

        upComingLabels.setCrewList(upComingCrewList);

        UpComingCrewAlertList upComingCrewAlertList = new UpComingCrewAlertList();
        upComingCrewAlertList.setPassport(crewAlertListPassport);
        upComingCrewAlertList.setVisa(crewAlertListVisa);
        upComingCrewAlertList.setAep(crewAlertListAep);
        upComingCrewAlertList.setTsa(crewAlertListTsa);
        upComingCrewAlertList.setAtpl(crewAlertListAtpl);
        upComingCrewAlertList.setCpl(crewAlertListCpl);
        upComingCrewAlertList.setIrend(crewAlertListIrend);
        upComingCrewAlertList.setCmc(crewAlertListCmc);
        upComingCrewAlertList.setMedical(crewAlertListMedical);
        upComingCrewAlertList.setCa35(crewAlertListCa35);
        upComingCrewAlertList.setCYf(crewAlertListYf);
        upComingCrewAlertList.setCoid(crewAlertListCoid);
        upComingCrewAlertList.setEgca(crewAlertListEgca);
        upComingCrewAlertList.setFrto(crewAlertListFrto);
        upComingCrewAlertList.setPmr(crewAlertListPmr);
        upComingCrewAlertList.setFrro(crewAlertListFrro);
        upComingCrewAlertList.setFata(crewAlertListFata);
        upComingCrewAlertList.setExpmed(crewAlertListExpmed);


        upComingLabels.setCrewAlertList(upComingCrewAlertList);

        UpcomingDocNames upcomingDocNames  =new UpcomingDocNames();
        upcomingDocNames.setCoid(coid);
        upcomingDocNames.setYf(yf);

        upComingLabels.setDocNames(upcomingDocNames);
       

        WorkPlaceLabels workPlaceLabels = new WorkPlaceLabels();
        workPlaceLabels.setTitle(workPlacetitle);
        workPlaceLabels.setSeeMoreBtnText(seeMoreBtnText);
        workPlaceLabels.setAgo(ago);

        homePageResBean.setWorkPlaceLabels(workPlaceLabels);

        RoasterResBean roasterResBean = new RoasterResBean();
        roasterResBean.setDurationText(durationText);
        roasterResBean.setTitle(roastertitle);
        roasterResBean.setNoData(noData);
        roasterResBean.setViewMore(viewMore);
        roasterResBean.setViewLess(viewLess);
        roasterResBean.setFlightNoTxt(flightNoTxt);
        roasterResBean.setErrorTxt(errorTxt);
        roasterResBean.setNoDataTitle(roasterNoDataTitle);
        roasterResBean.setNoDataDesc(roasterNoDataDesc);

        homePageResBean.setRosterLabels(roasterResBean);

        AnalyticsInfo analyticsInfo = new AnalyticsInfo();
        analyticsInfo.setCountryCode(countryCode);
        analyticsInfo.setCountryName(countryName);
        analyticsInfo.setLanguage(language);
        analyticsInfo.setPageName(pageName);
        analyticsInfo.setPageType(pageType);
        analyticsInfo.setServer(server);
        analyticsInfo.setSiteName(siteName);
        
        homePageResBean.setAnalyticsInfo(analyticsInfo);

    }

    @Override
    public String getExportedType() {
        return HomePageComponentImpl.RESOURCE_TYPE;
    }

    @Override
    public HomePageResBean getHomePageDetails() {
        return homePageResBean;
    }

}
