package com.finalp.tech;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TechController {

		private techMapper mapper;
		
		@Autowired
		public TechController(techMapper mapper) {
			this.mapper = mapper;
		}
		
		@Autowired
		private TechService service;
		
		@GetMapping("/itTech/forum")
		public List<techDTO> getTechListAll() {
			return mapper.getTechListAll();
		}

		@GetMapping("/itTech/forum/{tag}")
		public List<techDTO> getTechList(@PathVariable("tag") String tag) {
			return mapper.getTechList(tag);
		}
		
		@GetMapping("/itTech/forum/count")
		public Map<String, Object> getTechCount(){
			return mapper.getTechCount();
		}
		
		
		@GetMapping("/mypage/forum")
		public List<techDTO> getMyForum(@RequestParam("m_name") String m_name) {
			return mapper.getMyForum(m_name);
		}
		
		
		@RequestMapping("/itTech/forum/addTech")
		public int addTech(@RequestParam(value="t_tag") String t_tag,
										@RequestParam(value="t_name") String t_name,
										@RequestParam(value="t_content") String t_content) {
			return mapper.insertTech(t_tag, t_name, t_content);
		}
		
		@PutMapping("/itTech/forum/updateTech/{no}")
		public int updateTech(@PathVariable("no") int no, @RequestParam("content") String content) {
			return mapper.updateTech(content, no);
		}
		
		@DeleteMapping("/itTech/forum/deleteTech/{no}")
		public int deleteTech(@PathVariable("no") int no) {
			return mapper.deleteTech(no);
		}
		
		@GetMapping("/itTech/react")
		public Map<String, Object> getReactArticle() {
			return service.getReactArticle();
		}
		
		@GetMapping("/itTech/spring")
		public Map<String, Object> getSpringArticle() {
			return service.getSpringArticle();
		}
		
		@GetMapping("/itTech/vue")
		public Map<String, Object> getVueArciles() {
			return service.getVueArciles();
		}
		
		
		@GetMapping("/itTech/main")
		public Map<String, Object> getTechMain() {
			return service.getTechMain();
		}
		
		
		
	}


