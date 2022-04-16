package com.finalp.member;

import java.time.LocalDate;

import lombok.Data;

@Data
public class MemberDTO {
	private String m_name;//작성자
	private String m_email;//글제목
	private String m_passwd;
	private LocalDate m_date;//소제목
	private String m_role;
	
	public MemberDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public MemberDTO(String m_name,String m_email, String m_passwd, LocalDate m_date,String m_role) {
		this.m_name=m_name;
		this.m_email=m_email;
		this.m_passwd=m_passwd;
		this.m_date=m_date;
		this.m_role=m_role;
	}
}
