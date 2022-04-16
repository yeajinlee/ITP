package com.finalp.notice;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
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
public class NoticeController {
	@Autowired
	private NoticeMapper mapper;
	
	@Autowired
	public NoticeController(NoticeMapper mapper) {
		this.mapper = mapper;
	}
	@GetMapping("/notice")
	public List<NoticeDTO> getnoticeListAll() {
		return mapper.getnoticeListAll();
	}

	@GetMapping("/notice/{n_no}")
	public List<NoticeDTO> getnoticeList(@PathVariable("n_no") int n_no) {
		return mapper.getnoticeList(n_no);
	}
	
	@RequestMapping(value="/addNotice",method=RequestMethod.POST)
     int insertNotice(
			@RequestParam(value="n_title",required=false) String n_title,
			@RequestParam(value="n_content") String n_content,
			@RequestParam(value="n_date",required=false) @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate n_date
			) {
		
		return mapper.insertNotice(n_title,n_content,n_date);
	}
	
	@PutMapping("/updateNotice/{n_no}")
	public int updateNotice(@PathVariable("n_no") int n_no,
			@RequestParam(value="n_title",required=false) String n_title,
			@RequestParam("n_content") String n_content,
			@RequestParam(value="n_date",required=false) @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate n_date
	
			) { 
		return mapper.updateNotice(n_no,n_title,n_content,n_date);
	
	}
	

	@DeleteMapping("/deleteNotice/{n_no}")
	public int removeNotice(@PathVariable("n_no") int n_no) {
		return mapper.removeNotice(n_no);
	}
}
