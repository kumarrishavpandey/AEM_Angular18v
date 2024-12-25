package org.myai.core.models.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HomePageBoardDetails {

	@ValueMapValue
	private String persona;

	@ValueMapValue
	private String label1;

	@ValueMapValue
	private String label2;

	@ValueMapValue
	private String label3;

	@ValueMapValue
	private String label4;

	public String getPersona() {
		return persona;
	}

	public String getLabel1() {
		return label1;
	}

	public String getLabel2() {
		return label2;
	}

	public String getLabel3() {
		return label3;
	}

	public String getLabel4() {
		return label4;
	}

	public void setPersona(String persona) {
		this.persona = persona;
	}

	public void setLabel1(String label1) {
		this.label1 = label1;
	}

	public void setLabel2(String label2) {
		this.label2 = label2;
	}

	public void setLabel3(String label3) {
		this.label3 = label3;
	}

	public void setLabel4(String label4) {
		this.label4 = label4;
	}

}
