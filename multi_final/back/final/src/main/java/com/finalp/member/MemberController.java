package com.finalp.member;

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
public class MemberController {
	
	@Autowired
	private MemberMapper mapper;
	
	@Autowired
	public MemberController(MemberMapper mapper) {
		this.mapper=mapper;
	}
	
	@RequestMapping(value="/addMember",method=RequestMethod.POST)
    int insertMember(
   		 @RequestParam(value="m_name",required=false) String m_name,
    	 @RequestParam(value="m_email") String m_email,	
   		 @RequestParam(value="m_passwd") String m_passwd,
		 @RequestParam(value="m_date",required=false) @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate m_date,
		 @RequestParam(value="m_role",required=false) String m_role
			) {
		
		return mapper.insertMember(m_name,m_email,m_passwd,m_date,m_role);
	}
	
	//닉네임에 해당하는 내용만 조회
    @GetMapping("/member/dupliname")
	public List<MemberDTO> Duplimname(@RequestParam("m_name") String m_name){
		return mapper.Duplimname(m_name);  
	}
			
	//이메일에 해당하는 내용만 조회
	@GetMapping("/member/dupliemail")
	public List<MemberDTO> Duplimemail(@RequestParam("m_email") String m_email){
		return mapper.Duplimemail(m_email);  
	}
			
	@RequestMapping(value="/member/login",method=RequestMethod.POST)
	public List<MemberDTO> Loginmember(@RequestParam("m_email") String m_email){
		return mapper.Loginmember(m_email);  
	}
			
	//회원정보 수정
	@PutMapping(value="/member/{m_name}")
	public int updateMember(@PathVariable("m_name") String m_name,
			         @RequestParam(value="m_passwd", required=false) String m_passwd
			) {
		return mapper.updateMember( m_name, m_passwd);
	}
	
	//회원 탈퇴
	@DeleteMapping(value="/member/delete/{m_name}")
	public int deleteMember(@PathVariable("m_name") String m_name) {
		return mapper.deleteMember(m_name);
	}
			
					
}