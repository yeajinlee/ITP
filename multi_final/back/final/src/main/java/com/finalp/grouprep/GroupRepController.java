package com.finalp.grouprep;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin("*")
@RestController
public class GroupRepController {
	@Autowired
	private GroupRepMapper mapper;
	
	@Autowired
	public GroupRepController(GroupRepMapper mapper) {
		this.mapper = mapper;
	}
	
	//전체내용조회
	@GetMapping("/group/rep/{rg_no}")
	public List<GroupRepDTO> getgrouprepdetailList(@PathVariable("rg_no") int rg_no) {
		return mapper.getgrouprepdetailList(rg_no);
	}
	
	//댓글 개수 출력
	@GetMapping("/group/repnum/{rg_no}")
	public int getgrouprepListAll(@PathVariable("rg_no") int rg_no) {
		return mapper.getgrouprepListAll(rg_no);
	}
	
	//입력
	
	@RequestMapping(value="/addGroupRep/{rg_no}",method=RequestMethod.POST)
    int insertGroupRep(@PathVariable("rg_no") int rg_no,
			@RequestParam(value="rg_content",required=false) String rg_content,
			@RequestParam(value="rg_name",required=false) String rg_name,
			@RequestParam(value="rg_date",required=false) @DateTimeFormat(pattern="yyyy-MM-dd")  LocalDate rg_date
			) {
		
		return mapper.insertGroupRep(rg_no,rg_content,rg_name,rg_date);
	}
	
	//수정
	@PutMapping("/updateGroupRep/{rg_rno}")
	public int updateGroupRep(@PathVariable("rg_rno") int rg_rno,
			@RequestParam("rg_content") String rg_content
			) { 
		return mapper.updateGroupRep(rg_rno,rg_content);
	
	}
	
	//삭제
	@DeleteMapping("/deleteGroupRep/{rg_rno}")
	public int deleteGroupRep(@PathVariable("rg_rno") int rg_rno) {
		return mapper.deleteGroupRep(rg_rno);
	}
	
	//아이디에 해당하는 내용만 조회
			@GetMapping("/mypage/group/rep")
			public List<GroupRepDTO> getmygrouprepList(@RequestParam("m_name") String m_name){
				return mapper.getmygrouprepList(m_name);  
			}
	
}
