package org.myai.core.beans;

import java.io.Serializable;

public class RishavBean implements Serializable{

    private String rishavtext;
    private String rishavimage;

    public String getText() {
        return rishavtext;
    }
    public void setText(String rishavtext) {
        this.rishavtext = rishavtext;
    }
    public String getImage() {
        return rishavimage;
    }
    public void setImage(String rishavimage) {
        this.rishavimage = rishavimage;
    }
}
