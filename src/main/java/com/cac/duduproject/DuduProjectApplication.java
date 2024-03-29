package com.cac.duduproject;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@EnableScheduling
@SpringBootApplication
public class DuduProjectApplication {

	// 해당 프로젝트 타임존 설정
	@PostConstruct //프로젝트 실행 시, 처음 한번만 실행
	public void setTimeZone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
	public static void main(String[] args) {
		SpringApplication.run(DuduProjectApplication.class, args);
	}

}
