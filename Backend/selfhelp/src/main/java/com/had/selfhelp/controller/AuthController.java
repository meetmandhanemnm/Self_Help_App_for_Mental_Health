package com.had.selfhelp.controller;

//import com.had.selfhelp.dao.DoctorRepository;
//import com.had.selfhelp.dao.PatientRepository;
import com.had.selfhelp.entity.Doctor;
import com.had.selfhelp.entity.LoginRequest;
import com.had.selfhelp.entity.Patient;
//import com.had.selfhelp.entity.User;
import com.had.selfhelp.jwt.JwtUtils;
import com.had.selfhelp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
//import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserService userService;

    @Autowired
    EmailSenderService emailSenderService;
    @Autowired
    DoctorService doctorService;
    @Autowired
    PatientService patientService;

    @Autowired
    WorkoutService workoutService;


    @PostMapping("/check")
    public String aa(@RequestBody LoginRequest loginRequest)
    {
        return "bidu";
    }


    @PostMapping("/login/doctor")
    public ResponseEntity<Doctor> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MyCustomUserDetails userDetails = (MyCustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
//        return ResponseEntity.ok(new JwtResponse(jwt,
//                userDetails.getUsername(),
//                roles));
       // login seperate and jwt header
        Doctor d= doctorService.login(loginRequest);
        if(d!=null) {
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("JWT",
                    jwt);
            return ResponseEntity.ok().headers(responseHeaders)
                    .body(d);
        }
        else {
            throw new RuntimeException("Did not find doctor with these credentials");
        }

    }

    @PostMapping("/login/patient")
    public ResponseEntity<Patient> authenticateUsers(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MyCustomUserDetails userDetails = (MyCustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
//        return ResponseEntity.ok(new JwtResponse(jwt,
//                userDetails.getUsername(),
//                roles));
        // login seperate and jwt header
        Patient d= patientService.login(loginRequest);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("JWT",
                jwt);
        return ResponseEntity.ok().headers(responseHeaders)
                .body(d);


    }

    @PostMapping("/register/patient") //ADMIN
    ResponseEntity<?> createUser(@RequestBody Patient user){
        user.setPatient_id(0);
        //Doctor theDoctor = doctorService.assignDoctor();
        //user.setDoctor(theDoctor);
        patientService.save(user);
        workoutService.assignWorkout(user);

        userService.createUser(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        MyCustomUserDetails userDetails = (MyCustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
//        return ResponseEntity.ok(new JwtResponse(jwt,
//                userDetails.getUsername(),
//                roles));
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("JWT",
                jwt);
        return ResponseEntity.ok().headers(responseHeaders)
                .body(user);
    }
//    @PostMapping("/register/doctor") //ADMIN
//    ResponseEntity<?> createDoctor(@RequestBody Doctor user){
//        //user.setDoctor_id(0);
//        doctorService.save(user);
//        userService.createDoctor(user);
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtUtils.generateJwtToken(authentication);
//        MyCustomUserDetails userDetails = (MyCustomUserDetails) authentication.getPrincipal();
//        List<String> roles = userDetails.getAuthorities()
//                .stream().map(item -> item.getAuthority())
//                .collect(Collectors.toList());
////        return ResponseEntity.ok(new JwtResponse(jwt,
////                userDetails.getUsername(),
////                roles));
//
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("JWT",
//                jwt);
//        return ResponseEntity.ok().headers(responseHeaders)
//                .body(user);
//    }

    @PostMapping("/forgotPass/{email}")
    ResponseEntity<?> forgotPass(@PathVariable(name = "email") String email)
    {
        Patient p  = patientService.findByEmail(email);
        Doctor d = doctorService.findByEmail(email);
       // System.out.println(p.getEmail());
        if(p!=null || d!=null) {

            String u = p!=null?p.getUsername():d.getUsername();
            int leftLimit = 48; // numeral '0'
            int rightLimit = 122; // letter 'z'
            int targetStringLength = 10;
            Random random = new Random();

            String pass = random.ints(leftLimit, rightLimit + 1)
                    .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                    .limit(targetStringLength)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();

            System.out.println(pass);
            if(p!=null)
            {
                p.setPassword(pass);
                patientService.save(p);
            }
            else{
                d.setPassword(pass);
                doctorService.save(d);
            }
            userService.changePass(pass,u);
            emailSenderService.sendSimpleEmail(email,
                    "Your new Password for the username "+u+" is - " +pass,
                    "This Email for Password Reset"
            );
            return ResponseEntity.ok().body("password change successfully please check your email!!!");
        }
        else{
            return new ResponseEntity<>(
                    "No email Id Found",
                    HttpStatus.BAD_REQUEST);
        }
    }

}
