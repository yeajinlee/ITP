package com.finalp.itTrend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalp.config.ApiKey;

@Service
public class ItTrendService {
	
	private final ApiKey API_KEY;
	public ItTrendService(ApiKey apiKey) {
		this.API_KEY = apiKey;
	} 
	

	Object topObject = new Object();
	Map<String, Object> trendDetail = new HashMap<String, Object>();
	Map articlesMap = new HashMap();
	String content = null;
	String summary = null;
	String jsonInputString = null;
	
	public Object getArticle1() {
		// 실제 api 호출 부분
		URI uri = UriComponentsBuilder
				.fromUriString("https://newsapi.org/")
				.path("v2/top-headlines")
				.queryParam("country", "kr")
				.queryParam("category", "technology")
				.queryParam("pageSize", 3)
				.queryParam("page", 1)
//				.queryParam("q", "it")
				.queryParam("apiKey", API_KEY.getNewsApiKey())
				.encode(Charset.forName("utf-8"))
				.encode()
				.build()
				.toUri();
		RequestEntity<Void> req = RequestEntity
								.get(uri)
								.build();
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Object> result = restTemplate.exchange(req, Object.class);
		topObject = result.getBody();
	
		return topObject;
	}
	
	
	public Object getArticle2() {
		URI uri = UriComponentsBuilder
				.fromUriString("https://newsapi.org/")
				.path("v2/top-headlines")
				.queryParam("country", "kr")
				.queryParam("category", "technology")
				.queryParam("pageSize", 13)
				.queryParam("page", 1)
//				.queryParam("q", "it")
				.queryParam("apiKey", API_KEY.getNewsApiKey())
				.encode(Charset.forName("utf-8"))
				.encode()
				.build()
				.toUri();
		RequestEntity<Void> req = RequestEntity
								.get(uri)
								.build();
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Object> result = restTemplate.exchange(req, Object.class);
		return result.getBody();
		
	}
	
	
	public Map<String, Object> getTrendDetail(@PathVariable("title") String urlTitle) {
		String oriTitle = urlTitle.replace("-", " ");
		try {
			URI uri = UriComponentsBuilder
					.fromUriString("https://newsapi.org/")
					.path("v2/top-headlines")
					.queryParam("country", "kr")
					.queryParam("category", "technology")
					.queryParam("q", oriTitle)
					.queryParam("pageSize", 1)
					.queryParam("page", 1)
					.queryParam("apiKey", API_KEY.getNewsApiKey())
					.encode(Charset.forName("utf-8"))
					.encode()
					.build()
					.toUri();
			RequestEntity<Void> req = RequestEntity
									.get(uri)
									.build();
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Object> result = restTemplate.exchange(req, Object.class);
			//api 검색결과 객체
			Object trendInfo = result.getBody();
			//Map으로 변환
			ObjectMapper om = new ObjectMapper();
			Map trendMap = om.convertValue(trendInfo, Map.class);
			//Map내의 실제 데이터부분 articles를 ArrayList로
			ArrayList articles = (ArrayList) trendMap.get("articles");
			//ArrayList안에 Map으로 데이터가 들어있는 구조
			articlesMap = (Map) articles.get(0);
			
			
			String url = articlesMap.get("url").toString();
			//해당 기사의 url로 본문 파싱
			getContent(url);
			//본문으로 요약
			getSummary(content);
			//Map에 데이터 추가
			trendDetail.put("title", articlesMap.get("title"));
			trendDetail.put("urlToImage", articlesMap.get("urlToImage"));
			trendDetail.put("content", content);
			trendDetail.put("summary", summary);
			trendDetail.put("description", articlesMap.get("description"));
			trendDetail.put("url", url);
			 
		} catch (Exception e) {
			e.printStackTrace();
			content = "오류가 발생했습니다. 관리자에게 문의해주세요.";
		}

		return trendDetail;
	}
	
	public void getContent(String url){
		Document article;
		
		try {
			article = Jsoup.connect(url).get();
			Elements articleElements = new Elements();

			// 본문텍스트 추출
			articleElements = article.select("[itemprop=articleBody]");
			if (url.contains("asiatime.co.kr")) articleElements = article.select("body div p");
			if (url.contains("tokenpost.kr")) articleElements = article.select(".viewArticle p");
			if (url.contains("coinreaders")) articleElements = article.select("#textinput");
			if (url.contains("etoday.co.kr")) articleElements = article.select(".view_contents");
			if (url.contains("dispatch.co.kr")) articleElements = article.select("article");
			if (url.contains("news.nate.com")) articleElements = article.select("#realArtcContents");
			if (url.contains("news.samsung.com")) articleElements = article.select(".text_cont");
			if (url.contains("autopostkorea.com")) articleElements = article.select("[itemprop=text] p");
			if (url.contains("hankyung.com")) articleElements = article.select("#articletxt");

			content = articleElements.text();
			content = trimContent(content);
			
			if (url.contains("youtube.com") || url.contains("biz.chosun.com") || articleElements.hasText() == false) {
				content = "원문보기를 눌러 기사를 확인하세요.";
			}
			
			System.out.println("getContent content => " + content);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

	}
	
	//요약 api
	public void getSummary(String content) throws Exception {
		StringBuilder response = new StringBuilder();
		URL url = new URL("https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID", API_KEY.getNaverId());
		conn.setRequestProperty("X-NCP-APIGW-API-KEY", API_KEY.getNaverSecret());
		conn.setRequestProperty("Content-Type", "application/json; utf-8");
		conn.setDoOutput(true);
		jsonInputString = "{\r\n" + 
				"  \"document\": {\r\n" + 
				"    \"content\": \" " + content + " \"\r\n " +
				"  },\r\n" + 
				"  \"option\": {\r\n" + 
				"    \"language\": \"ko\",\r\n" + 
				"    \"model\": \"news\",\r\n" + 
				"    \"tone\": 0,\r\n" + 
				"    \"summaryCount\": 3\r\n" + 
				"  }\r\n" + 
				"}";
		
		try {
			OutputStream os = conn.getOutputStream();
			byte[] input = jsonInputString.getBytes("utf-8");
			os.write(input, 0, input.length);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));

			String responseLine = null;
			while ((responseLine = br.readLine()) != null) {
				response.append(responseLine.trim());
			}
			
			

			os.close();
			summary = response.toString();
			summary = trimSummary(summary);
			
			System.out.println("getSummary summary => " + summary);
			
		} catch (Exception e) {
			e.printStackTrace();

				summary = " ";
				
		}
		
		
	
	}
	
	public String trimContent(String content) {
		
		//기사 본문 내 " 제거
		content = content.replace("\"", "'");
		content = content.replace("\\", "'");
		//기사 본문 내 [] 내용 제거
		if (content.contains("[")) {
			content = content.substring(content.indexOf("]")+1);
			if(content.contains("[")) {
				int index = content.indexOf("[");
				content = content.substring(0, index);
			}
		}
		if (content.contains("▶")) {
			int index = content.indexOf("▶");
			content = content.substring(0, index);
		}
		//요약 api 글자수제한에 맞게 줄임
		if (content.length() > 2000) {
			content = content.substring(0, 1950);
		}
		
		return content;
	}
	
	
	public String trimSummary(String summary) {
		summary = summary.replace("\"", "");
		summary = summary.substring(9, summary.length()-1);
		return summary;
	}
}
