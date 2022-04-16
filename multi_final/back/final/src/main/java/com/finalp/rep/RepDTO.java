package com.finalp.rep;

import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class RepDTO {
	
	private int r_rno;//댓글번호
	private int r_no;//원래글번호
	private String r_content;//내용
	private String r_name;//작성자
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate r_date;//작성날짜
	private String c_title;//원래 글 제목
	
	public RepDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public RepDTO(int r_rno, int r_no, String r_content, String r_name, LocalDate r_date,String c_title) {
		this.r_rno=r_rno;
		this.r_no=r_no;
		this.r_content=r_content;
		this.r_name=r_name;
		this.r_date=r_date;
		this.c_title=c_title;
	}
}
