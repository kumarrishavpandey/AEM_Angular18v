package org.myai.core.models;
import static org.apache.sling.api.resource.ResourceResolver.PROPERTY_RESOURCE_TYPE;

import javax.annotation.PostConstruct;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = Resource.class)
public class TestComponent {

	@ValueMapValue(name = PROPERTY_RESOURCE_TYPE, injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(values = "No resourceType")
	protected String resourceType;

	@SlingObject
	private Resource currentResource;
	@SlingObject
	private ResourceResolver resourceResolver;

	private String textData;
	private String resourcesType;
	private String currentPage;

	@PostConstruct
	protected void init() {
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		String currentPagePath = "";
		if (pageManager != null) {
			Page page = pageManager.getContainingPage(currentResource);
			if (page != null) {
				currentPagePath = page.getPath();
			}
		}

		textData = "THIS IS VIA FIRST TEST COMPONENT JAVA CLASS";
		resourcesType =  resourceType;
		currentPage =  currentPagePath;
	}

	public String getTextData() {
		return textData;
	}
	public String getResourcesType() {
		return resourcesType;
	}
	public String getCurrentPage() {
		return currentPage;
	}

}
