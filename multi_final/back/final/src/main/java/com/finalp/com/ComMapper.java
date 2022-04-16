package com.finalp.com;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;



@Mapper
public interface ComMapper {
	@Select("select count(*) from itp_com")
	int getcomListAll();
	
	@Select("select * from itp_com orders where c_no between (select count(*) from itp_com)-(4*#{page}-1) and (select count(*) from itp_com)-(4*(#{page}-1))")
	List<ComDTO> getcomList(@Param("page") String page);
	

	@Select("select * from itp_com order by c_no desc")
	List<ComDTO> getcomListdata();
	
	
	@Select("select * from itp_com where c_name=#{m_name}")
	List<ComDTO> getmycomList(@Param("m_name") String m_name);
	
	//제목검색
	@Select(
			"select * from itp_com orders where c_title LIKE '%${title}%' and c_no between (select count(*) from itp_com)-(4*#{page}-1) "
			+ "and (select count(*) from itp_com)-(4*(#{page}-1))")
	List<ComDTO> getcomListSearch(@Param("page") String page, @Param("title") String title);
	
	@Select("select * from itp_com where c_no=#{c_no}")
	public List<ComDTO> getcomdetailList(@Param("c_no") int c_no);
	
	//메인화면에 보여질 최신순 3개
	@Select("select * from itp_com order by c_no desc limit 5")
	public List<ComDTO> getcomListmain();
	
	//추가
	@Insert("INSERT INTO itp_com(c_name,c_title,c_content,c_date) values(#{c_name},#{c_title},#{c_content},#{c_date})")
	int insertCom(
			@Param("c_name") String c_name,
			@Param("c_title") String c_title,
			@Param("c_content") String c_content,
			@Param("c_date") LocalDate c_date
			
			);
	
	//수정
	@Update("UPDATE itp_com SET c_title = #{c_title}, c_content= #{c_content} WHERE c_no= #{c_no}")
	int updateCom(
			@Param("c_no") int g_no,
			@Param("c_title") String g_title,
			@Param("c_content") String g_content
		);
	
	@Delete("DELETE FROM itp_com WHERE c_no = #{c_no}")
	int deleteCom(@Param("c_no") int c_no);
}
