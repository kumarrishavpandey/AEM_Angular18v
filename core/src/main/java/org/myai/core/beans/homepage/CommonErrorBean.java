package org.myai.core.beans.homepage;

import java.io.Serializable;

public class CommonErrorBean implements Serializable {

	private String errorText;

	public String getErrorText() {
		return errorText;
	}

	public void setErrorText(String errorText) {
		this.errorText = errorText;
	}

}
