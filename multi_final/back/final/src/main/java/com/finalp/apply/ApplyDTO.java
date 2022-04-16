package com.finalp.apply;


import lombok.Data;

@Data
public class ApplyDTO {
	private int a_no;//신청번호
	private String a_name;//신청자닉네임
	private String a_email;//신청자이메일
	private String a_content;//모임찾기 신청시 쓰는 내용
	private int a_gno;//모임찾기 번호
	private String g_name;//모임찾기 작성자 닉네임
	private String g_title;//모임찾기 글 제목
	private String a_auth;//승인여부
	
	public ApplyDTO() {
		// TODO Auto-generated constructor stub
	}
	public ApplyDTO(int a_no,String a_name,String a_email, String a_content, int a_gno,String g_name,String g_title,String a_auth) {
	this.a_no=a_no;
	this.a_name=a_name;
	this.a_email=a_email;
	this.a_content=a_content;
	this.a_gno=a_gno;
	this.g_name=g_name;
	this.g_title=g_title;
	this.a_auth=a_auth;
	}
}
