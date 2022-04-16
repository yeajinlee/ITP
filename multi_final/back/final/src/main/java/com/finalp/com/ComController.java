package com.finalp.com;

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
public class ComController {
	@Autowired
	private ComMapper mapper;
	
	@Autowired
	public ComController(ComMapper mapper) {
		this.mapper = mapper;
	}
	
	@GetMapping("/com/listcount")
	public int getcomListAll() {
		return mapper.getcomListAll();
	}
	
	//아이디에 해당하는 내용만 조회
		@GetMapping("/mypage/com")
		public List<ComDTO> getmycomList(@RequestParam("m_name") String m_name){
			return mapper.getmycomList(m_name);  
		}
		
	//전체내용조회
	@GetMapping("/com/listAll")
	public List<ComDTO> getcomListdata(){
		return mapper.getcomListdata();  
	}
	//최신순 조회
	@GetMapping("/com/recent")
	public List<ComDTO> getcomListmain(){
		return mapper.getcomListmain();
	}
	//페이징 조회
	@GetMapping("/com/list")
	public List<ComDTO> getcomList(@RequestParam("page") String page){
		return mapper.getcomList(page);  
	}
	
	//상세페이지
	@GetMapping("/com/{c_no}")
	public List<ComDTO> getcomdetailList(@PathVariable("c_no") int c_no) {
		return mapper.getcomdetailList(c_no);
	}
	
	//검색 제목으로
	@GetMapping("/com/list/searchbytitle")
	public List<ComDTO> getcomListSearch(@RequestParam("page") String page, @RequestParam(value="title",required=false) String title){
		return mapper.getcomListSearch(page,title); 
	}
	
	//추가
	@RequestMapping(value="/addCom",method=RequestMethod.POST)
     int insertCom(
    		 @RequestParam(value="c_name",required=false) String c_name,
			@RequestParam(value="c_title") String c_title,
			@RequestParam(value="c_content") String c_content,
			@RequestParam(value="c_date",required=false) @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate c_date
			) {
		
		return mapper.insertCom(c_name,c_title,c_content,c_date);
	}
	
	
	
	//수정
	@PutMapping("/updateCom/{c_no}")
	public int updateGroup(@PathVariable("c_no") int c_no,
			@RequestParam(value="c_title",required=false) String c_title,
			@RequestParam("c_content") String c_content
	
			) { 
		return mapper.updateCom(c_no,c_title,c_content);
	
	}
	
	//삭제
	@DeleteMapping("/deleteCom/{c_no}")
	public int deleteGroup(@PathVariable("c_no") int c_no) {
		return mapper.deleteCom(c_no);
	}

}
