package org.myai.core.models.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SalutationPersonaDetails {

	@ValueMapValue
	private String salutationPersona;

	@ChildResource(name = "salutationText")
	private List<SalutationTextDetails> salutationText;

	public String getSalutationPersona() {
		return salutationPersona;
	}

	public void setSalutationPersona(String salutationPersona) {
		this.salutationPersona = salutationPersona;
	}

	public List<SalutationTextDetails> getSalutationText() {
		if (null != salutationText && !salutationText.isEmpty())
			return new ArrayList<>(salutationText);
		else
			return new ArrayList<>();
	}

	public void setSalutationText(List<SalutationTextDetails> salutationText) {
		if (null != salutationText && !salutationText.isEmpty())
			this.salutationText = new ArrayList<>(salutationText);
	}

}
