package com.finalp.tech;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class techDTO {
	private int t_no;//번호
	private int t_parentno;
	private String t_tag;//카테고리
	private String t_name;//작성자
	private String t_content;//내용
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate t_date;//작성일

}
