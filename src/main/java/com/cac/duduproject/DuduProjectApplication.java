package com.cac.duduproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DuduProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(DuduProjectApplication.class, args);
	}

}
