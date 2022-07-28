package com.finalp.tech;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

@Service
public class TechService {
	
	public Map<String, Object> getReactArticle() {
		Map<String, Object> reactMap = new HashMap<String, Object>();
		ArrayList<Object> reactArray = new ArrayList<Object>();
		
		try {
			Document reactDoc = Jsoup.connect("https://ko.reactjs.org/blog/all.html").get();
			Element reactEl;
			
			for(int i = 0; i <= 2; i++) {
				reactEl = reactDoc.select("body h2").get(i);
				String title = reactEl.text();
				String titleLink = reactEl.html().replaceAll("<a class=\"css-m6cbzp\" href=\"", "");
				titleLink = titleLink.substring(0, titleLink.indexOf("\""));
				String date = titleLink.substring(6, 16).replace("/", "-");
				
				//리액트로 보낼 데이터
				Map<String, String> titleMap = new HashMap<String, String>();
				titleMap.put("title", title);
				titleMap.put("titleLink", titleLink);
				titleMap.put("date", date);
				reactArray.add(i, titleMap);
				reactMap.put("articles", reactArray);
			}
		
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return reactMap;
	}
	
	
	public Map<String, Object> getSpringArticle() {
		Map<String, Object> springMap = new HashMap<String, Object>();
		ArrayList<Object> springArray = new ArrayList<Object>();
		try {
			Document springDoc = Jsoup.connect("https://spring.io/blog").get();
			Element springEl;
			
			for(int i = 0; i <= 2; i++) {
				springEl = springDoc.select("body h2").get(i);
				String title = springEl.text();
				String titleLink = springEl.html().replaceAll("<a href=\"", "");
				
				String date = titleLink.substring(6, 16).replace("/", "-");
				titleLink = titleLink.substring(0, titleLink.indexOf("\""));
				title = title.replace(",", " ");
			
				//리액트로 보낼 데이터
				Map<String, String> titleMap = new HashMap<String, String>();
				titleMap.put("title", title);
				titleMap.put("titleLink", titleLink);
				titleMap.put("date", date);
				springArray.add(i, titleMap);
				
				springMap.put("articles", springArray);
			}
		
		} catch (IOException e) {
			e.printStackTrace();
		}
	
		return springMap;
	}
	
	public Map<String, Object> getVueArciles() {
		Map<String, Object> vueMap = new HashMap<String, Object>();
		ArrayList<Object> vueArray = new ArrayList<Object>();
		try {
			Document vueDoc = Jsoup.connect("https://news.vuejs.org/archive").get();
			Element vueEl;
			
			for(int i = 0; i <= 2; i++) {
				vueEl = vueDoc.getElementsByClass("issue-title").get(i);
				String title = vueEl.text();
				vueEl = vueDoc.getElementsByAttributeValueStarting("href", "/issues/").get(i);
				String titleLink = vueEl.attr("href");
				vueEl = vueDoc.getElementsByClass("issue-date").get(i);
				String fullDate = vueEl.text();
				fullDate  = fullDate.substring(fullDate.indexOf(" "));
				String postYear = fullDate.substring(fullDate.length()-4);
				String postMonth = fullDate.split(" ")[1];
				postMonth = getMonthNum(postMonth);
				String postDate = fullDate.split(" ")[2];
				title = title.replace(",", " ");
				
				postDate = postDate.replace(",", "");
				if (postMonth.length() == 1) {
					postMonth = "0" + postMonth;
				}
				if (postDate.length() == 1) {
					postDate = "0" + postDate;
				}
				
				String date = postYear + "-" + postMonth + "-" + postDate;
				//리액트로 보낼 데이터
				Map<String, String> titleMap = new HashMap<String, String>();
				titleMap.put("title", title);
				titleMap.put("titleLink", titleLink);
				titleMap.put("date", date);
				vueArray.add(i, titleMap);
				
				vueMap.put("articles", vueArray);
			}
		
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return vueMap;
	}
	
	public Map<String, Object> getTechMain() {
		Map<String, Object> mainMap = new HashMap<String, Object>();
		ArrayList<Object> reactArray = new ArrayList<Object>();
		ArrayList<Object> springArray = new ArrayList<Object>();
		ArrayList<Object> vueArray = new ArrayList<Object>();
		try {
			Document doc = Jsoup.connect("https://ko.reactjs.org/blog/all.html").get();
			Element element = doc.select("body h2").get(0);
			String title = element.text();
			String titleLink = element.html().replaceAll("<a class=\"css-m6cbzp\" href=\"", "");
			titleLink = titleLink.substring(0, titleLink.indexOf("\""));
			Map<String, String> reactTitleMap = new HashMap<String, String>();
			reactTitleMap.put("title", title);
			reactTitleMap.put("titleLink", titleLink);
			reactArray.add(reactTitleMap);
			mainMap.put("reactArticles", reactArray);
			
			//spring
			doc = Jsoup.connect("https://spring.io/blog").get();
			element = doc.select("body h2").get(0);
			title = element.text();
			titleLink = element.html().replaceAll("<a href=\"", "");
			titleLink = titleLink.substring(0, titleLink.indexOf("\""));
			title = title.replace(",", " ");
			Map<String, String> springTitleMap = new HashMap<String, String>();
			springTitleMap.put("title", title);
			springTitleMap.put("titleLink", titleLink);
			springArray.add(springTitleMap);
			mainMap.put("springArticles", springArray);
			
			//vue
			doc = Jsoup.connect("https://news.vuejs.org/archive").get();
			element = doc.getElementsByClass("issue-title").get(0);
			title = element.text();
			element = doc.getElementsByAttributeValueStarting("href", "/issues/").get(0);
			titleLink = element.attr("href");
			title = title.replace(",", " ");
			Map<String, String> vueTitleMap = new HashMap<String, String>();
			vueTitleMap.put("title", title);
			vueTitleMap.put("titleLink", titleLink);
			vueArray.add(vueTitleMap);
			mainMap.put("vueArticles", vueArray);
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return mainMap;
	}
	
	private String getMonthNum(String postMonth) {
		Date date = null;
	    try {
	        date = new SimpleDateFormat("MMM", Locale.ENGLISH).parse(postMonth);
	        Calendar cal = Calendar.getInstance();
	        cal.setTime(date);
	        return String.valueOf(cal.get(Calendar.MONTH));
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "";
	    }
		
	}
}
