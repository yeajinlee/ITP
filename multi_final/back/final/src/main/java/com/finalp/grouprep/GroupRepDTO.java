package com.finalp.grouprep;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class GroupRepDTO {
	private int rg_rno;//댓글번호
	private int rg_no;//원래글번호
	private String rg_content;//내용
	private String rg_name;//작성자
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate rg_date;//작성날짜
	private String g_title;//원래 글 제목
	
	public GroupRepDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public GroupRepDTO(int rg_rno, int rg_no, String rg_content, String rg_name, LocalDate rg_date,String g_title) {
		this.rg_rno=rg_rno;
		this.rg_no=rg_no;
		this.rg_content=rg_content;
		this.rg_name=rg_name;
		this.rg_date=rg_date;
		this.g_title=g_title;
	}
}
