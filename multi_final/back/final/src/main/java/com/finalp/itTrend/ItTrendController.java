package com.finalp.itTrend;


import java.util.Map;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalp.config.ApiKey;




@RestController
public class ItTrendController {
	@Autowired
	private ItTrendService service;
	
	
	@GetMapping("/article1")
	public Object getArticle1() {
		return service.getArticle1();
	}
	
	
	@GetMapping("/article2")
	public Object getArticle2() {
		return service.getArticle2();
	}
	
	@GetMapping("/itTrend/{title}")
	public Map<String, Object> getTrendDetail(@PathVariable("title") String urlTitle) {
		return service.getTrendDetail(urlTitle);
	}

}
