package com.finalp.member;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;


@Mapper
public interface MemberMapper {

	@Insert("INSERT INTO itp_member(m_name,m_email,m_passwd,m_date,m_role) values(#{m_name},#{m_email},#{m_passwd},#{m_date},#{m_role})")
	int insertMember(
			@Param("m_name") String m_name,
			@Param("m_email") String m_email,
			@Param("m_passwd") String m_passwd,
			@Param("m_date") LocalDate m_date,
			@Param("m_role") String m_role
			
			
			);
	
	@Select("select * from itp_member where m_name=#{m_name}")
	List<MemberDTO> Duplimname(@Param("m_name") String m_name);
	
	@Select("select * from itp_member where m_email=#{m_email}")
	List<MemberDTO> Duplimemail(@Param("m_email") String m_email);
	
	@Select("select * from itp_member where m_email=#{m_email}")
	List<MemberDTO> Loginmember(@Param("m_email") String m_email);
	
	//회원정보 수정
	@Update("UPDATE itp_member SET m_passwd=#{m_passwd} WHERE m_name=#{m_name}")
	int updateMember(
			@Param("m_name") String m_name,
			@Param("m_passwd") String m_passwd
			);
	
	//회원 탈퇴
	@Delete("DELETE FROM itp_member WHERE m_name=#{m_name}")
	int deleteMember(@Param("m_name") String m_name);
	
}