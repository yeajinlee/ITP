package com.finalp.notice;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;


@Mapper
public interface NoticeMapper {
	@Select("select * from itp_notice order by n_no desc")
	public List<NoticeDTO> getnoticeListAll();
	
	@Select("SELECT * FROM itp_notice where n_no=#{n_no}")
	public List<NoticeDTO> getnoticeList(@Param("n_no") int n_no);
	
	@Insert("INSERT INTO itp_notice(n_title,n_content,n_date) values(#{n_title},#{n_content},#{n_date})")
	int insertNotice(
			@Param("n_title") String n_title,
			@Param("n_content") String n_content,
			@Param("n_date") LocalDate n_date
			
			);
	
	@Update("UPDATE itp_notice SET n_title = #{n_title}, n_content= #{n_content},n_date=#{n_date} WHERE n_no= #{n_no}")
	int updateNotice(
			@Param("n_no") int n_no,
			@Param("n_title") String n_title,
			@Param("n_content") String n_content,
			@Param("n_date") LocalDate n_date
		);
	
	@Delete("DELETE FROM itp_notice WHERE n_no = #{n_no}")
	int removeNotice(@Param("n_no") int n_no);
}
