package com.finalp.rep;

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
public class RepController {
	@Autowired
	private RepMapper mapper;
	
	@Autowired
	public RepController(RepMapper mapper) {
		this.mapper = mapper;
	}
	
	//전체내용조회
	@GetMapping("/rep/{r_no}")
	public List<RepDTO> getcomdetailList(@PathVariable("r_no") int r_no) {
		return mapper.getrepdetailList(r_no);
	}
	
	//아이디에 해당하는 내용만 조회
	@GetMapping("/mypage/rep")
	public List<RepDTO> getmyrepList(@RequestParam("m_name") String m_name){
		return mapper.getmyrepList(m_name);  
	}
	//댓글갯수출력
	@GetMapping("/com/repnum/{r_no}")
	public int getcomrepListAll(@PathVariable("r_no") int r_no) {
		return mapper.getcomrepListAll(r_no);
	}
	
	//입력
	
	@RequestMapping(value="/addRep/{r_no}",method=RequestMethod.POST)
    int insertRep(@PathVariable("r_no") int r_no,
			@RequestParam(value="r_content",required=false) String r_content,
			@RequestParam(value="r_name",required=false) String r_name,
			@RequestParam(value="r_date",required=false) @DateTimeFormat(pattern="yyyy-MM-dd")  LocalDate r_date
			) {
		
		return mapper.insertRep(r_no,r_content,r_name,r_date);
	}
	
	//수정
	@PutMapping("/updateRep/{r_rno}")
	public int updateRep(@PathVariable("r_rno") int r_rno,
			@RequestParam("r_content") String r_content
			) { 
		return mapper.updateRep(r_rno,r_content);
	
	}
	
	//삭제
	@DeleteMapping("/deleteRep/{r_rno}")
	public int deleteGroup(@PathVariable("r_rno") int r_rno) {
		return mapper.deleteRep(r_rno);
	}

}
