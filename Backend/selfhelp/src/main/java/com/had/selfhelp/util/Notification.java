package com.had.selfhelp.util;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import com.had.selfhelp.dao.PatientRepository;
import com.had.selfhelp.entity.Patient;

@Configuration
@EnableScheduling
public class Notification {
	
	@Autowired
	PatientRepository patientRepository;
	
//	@Scheduled(fixedDelay = 5000)
	public void scheduleFixedRateTask() {
		List<Patient> patientList = patientRepository.findAll();
	    System.out.println("Fixed rate task - " + System.currentTimeMillis() / 1000);
	    for(Patient P : patientList) {
	    	if(P.getLast_login()!=null) {
	                Date date1 = P.getLast_login();   
	                Date date2 = new Date();   
	                // Calculate time difference in milliseconds   
	                long time_difference = date2.getTime() - date1.getTime();
	                if(time_difference>5000) {
	                	System.out.println(P.getFirstName());
	                	try {
		                	RestTemplate restTemplate = new RestTemplate();
		                	
		                	HttpHeaders headers = new HttpHeaders();
		                	
		                	headers.setContentType(MediaType.APPLICATION_JSON);
		                	
		                	Request req = new Request();
	
		                    req.setAppId("7695");
		                    req.setAppToken("wDN7Drh1sdRsg6rE11FAVz");
		                    req.setMessage("Hey "+P.getFirstName()+ "! Long time no see!!");
		                    req.setSubID(String.valueOf(P.getPatient_id()));
		                    req.setTitle("Don't miss on your mental health!");
		                    
		                    HttpEntity<?> request_token = new HttpEntity<>(req, headers);
	
		                    String response = restTemplate.postForObject("https://app.nativenotify.com/api/indie/notification", request_token, String.class);
		                   
		                    if(response.contains("504 Gateway Time-out")) 
		                    	continue;
	                }
	                catch (Exception e) {
						continue;
					}
	            }
	    	}
	    }
	    
	}
	
}