package com.finalp.rep;

import java.time.LocalDate;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;


@Mapper
public interface RepMapper {
	@Select("select count(*) from itp_reply")
	int getrepListAll();
	
	//댓글보이게
	@Select("select * from itp_reply where r_no=#{r_no} order by r_rno desc")
	public List<RepDTO> getrepdetailList(@Param("r_no") int r_no);
	
	//댓글개수
	@Select("select count(*) from itp_reply where r_no=#{r_no}")
	int getcomrepListAll(@Param("r_no") int r_no);
	
	@Select("select r.*,c.c_title,c.c_no from itp_reply r inner join itp_com c on r.r_no=c.c_no and r_name=#{m_name}")
	List<RepDTO> getmyrepList(@Param("m_name") String m_name);
	//수정
		@Update("UPDATE itp_reply SET r_content= #{r_content} WHERE r_rno= #{r_rno}")
		int updateRep(
				@Param("r_rno") int r_rno,
				@Param("r_content") String r_content
			);
		
		@Delete("DELETE FROM itp_reply WHERE r_rno = #{r_rno}")
		int deleteRep(@Param("r_rno") int r_rno);
		
		@Insert("INSERT INTO itp_reply (r_no,r_content,r_name,r_date) values(#{r_no},#{r_content},#{r_name},#{r_date})")
		int insertRep(
				@Param("r_no") int r_no,
				@Param("r_content") String r_content,
				@Param("r_name") String r_name,
				@Param("r_date") LocalDate r_date
				
				);
	
}
