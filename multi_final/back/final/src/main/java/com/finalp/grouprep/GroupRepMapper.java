package com.finalp.grouprep;

import java.time.LocalDate;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;


@Mapper
public interface GroupRepMapper {
//	@Select("select count(*) from itp_replygroup where rg_no=#{rg_no}")
//	int getgroupreAll(@Param("rg_no") int rg_no);
//	
	//댓글보이게
	@Select("select * from itp_replygroup where rg_no=#{rg_no} order by rg_rno desc")
	public List<GroupRepDTO> getgrouprepdetailList(@Param("rg_no") int rg_no);
	
	//수정
			@Update("UPDATE itp_replygroup SET rg_content= #{rg_content} WHERE rg_rno= #{rg_rno}")
			int updateGroupRep(
					@Param("rg_rno") int rg_rno,
					@Param("rg_content") String rg_content
				);
			
			@Delete("DELETE FROM itp_replygroup WHERE rg_rno = #{rg_rno}")
			int deleteGroupRep(@Param("rg_rno") int rg_rno);
			
			@Insert("INSERT INTO itp_replygroup (rg_no,rg_content,rg_name,rg_date) values(#{rg_no},#{rg_content},#{rg_name},#{rg_date})")
			int insertGroupRep(
					@Param("rg_no") int rg_no,
					@Param("rg_content") String rg_content,
					@Param("rg_name") String rg_name,
					@Param("rg_date") LocalDate rg_date
					
					);
			
			@Select("select r.*,g.g_title,g.g_no from itp_replygroup r inner join itp_group g on r.rg_no=g.g_no and rg_name=#{m_name}")
			List<GroupRepDTO> getmygrouprepList(@Param("m_name") String m_name);
			
			@Select("select count(*) from itp_replygroup where rg_no=#{rg_no}")
			int getgrouprepListAll(@Param("rg_no") int rg_no);

			
}
