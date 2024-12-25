package org.myai.core.beans.homepage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.myai.core.models.impl.PersonaDetails;

public class MyBoardLabels implements Serializable {

    private String boardTitle;

    private CommonErrorBean commonErrorBean;

    private transient List<PersonaDetails> homePageBoardPersonaDetails;

    public String getTitle() {
        return boardTitle;
    }

    public void setTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }

    public CommonErrorBean getCommonMessages() {
        return commonErrorBean;
    }

    public void setCommonMessages(CommonErrorBean commonErrorBean) {
        this.commonErrorBean = commonErrorBean;
    }

    public List<PersonaDetails> getPersonaData() {
        return new ArrayList<>(homePageBoardPersonaDetails);
    }

    public void setPersonaData(List<PersonaDetails> homePageBoardPersonaDetails) {
        this.homePageBoardPersonaDetails = new ArrayList<>(homePageBoardPersonaDetails);
    }

}
