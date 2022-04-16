package com.finalp.notice;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class NoticeDTO {
	private int n_no;//번호
	private String n_title;//제목

	private String n_content;//내용
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDate n_date;//작성날짜
	
	public NoticeDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public NoticeDTO(int n_no, String n_title, String n_content, LocalDate n_date) {
		this.n_no=n_no;
		this.n_title=n_title;
	
		this.n_content=n_content;
		this.n_date=n_date;
	}
	
}
