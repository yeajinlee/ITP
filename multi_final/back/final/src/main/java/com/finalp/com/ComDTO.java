package com.finalp.com;

import java.time.LocalDate;


import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class ComDTO {
	private int c_no;//번호
	private String c_name;//작성자
	private String c_title;//글제목
	private String c_content;//내용
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate c_date;//작성날짜
	
	public ComDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public ComDTO(int c_no, String c_name, String c_title, String c_content, LocalDate c_date) {
		this.c_no=c_no;
		this.c_name=c_name;
		this.c_title=c_title;
		this.c_content=c_content;
		this.c_date=c_date;
	}
}
