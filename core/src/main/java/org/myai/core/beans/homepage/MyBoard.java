package org.myai.core.beans.homepage;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.myai.core.models.impl.HomePageBoardDetails;

public class MyBoard implements Serializable {

	private String boardTitle;

	private transient List<HomePageBoardDetails> myBoards;

	public String getBoardTitle() {
		return boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public List<HomePageBoardDetails> getMyBoard() {
		return new ArrayList<>(myBoards);
	}

	public void setMyBoard(List<HomePageBoardDetails> myBoard) {
		this.myBoards = new ArrayList<>(myBoard);
	}

}
