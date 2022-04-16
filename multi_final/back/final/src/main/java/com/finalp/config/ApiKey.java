package com.finalp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class ApiKey {
	@Value("${news-api}")
	private String newsApiKey;
	
	@Value("${naver-id}")
	private String naverId;
	
	@Value("${naver-secret}")
	private String naverSecret;
}
