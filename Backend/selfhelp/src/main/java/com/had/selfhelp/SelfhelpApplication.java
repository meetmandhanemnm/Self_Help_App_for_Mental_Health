package com.had.selfhelp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
//import org.springframework.context.event.EventListener;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

//import javax.mail.MessagingException;
//import java.util.Random;
//import org.springframework.context.annotation.Bean;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class SelfhelpApplication {

	public static void main(String[] args) {
		System.out.println("Filtering on...............main............................................");


		SpringApplication.run(SelfhelpApplication.class, args);
	}

	//@SuppressWarnings("deprecation")
	@Bean
	public WebMvcConfigurer configure() {
	   return new WebMvcConfigurer() {
	      @Override
	      public void addCorsMappings(CorsRegistry registry) {
			  System.out.println("Filtering on...............main............................................");
	         registry.addMapping("/**").allowedOrigins("*");

	      }
	   };
	}


}
