package org.myai.core.models.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PersonaDetails {

	@ValueMapValue
	private String persona;

	@ChildResource(name = "cards")
	private List<HomePageCardDetails> cards;

	public String getPersona() {
		return persona;
	}

	public void setPersona(String persona) {
		this.persona = persona;
	}

	public List<HomePageCardDetails> getCards() {
		if (null != cards && !cards.isEmpty())
			return new ArrayList<>(cards);
		else 
			return new ArrayList<>();
	}

	public void setCards(List<HomePageCardDetails> cards) {
		if (null != cards && !cards.isEmpty())
			this.cards = new ArrayList<>(cards);
	}

}
