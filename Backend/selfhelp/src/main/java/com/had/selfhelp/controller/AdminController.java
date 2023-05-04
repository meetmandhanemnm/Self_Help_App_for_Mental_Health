package com.had.selfhelp.controller;

import com.had.selfhelp.entity.Doctor;
//import com.had.selfhelp.entity.Patient;
import com.had.selfhelp.jwt.JwtUtils;
import com.had.selfhelp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

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


    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/register/doctor") //ADMIN
    ResponseEntity<?> createDoctor(@RequestBody Doctor user){
        user.setDoctor_id(0);
        doctorService.save(user);
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 5;
        Random random = new Random();

        String pass = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        System.out.println(pass);
        user.setPassword(pass);
        userService.createDoctor(user.getUsername(),pass);
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
       // user.setDoctor_id(0);


        doctorService.save(user);
        emailSenderService.sendSimpleEmail(user.getEmail(),
                "Congratulations and welcome to the Self Help App For Mental Health!!\nThank you for registering as a doctor.Here are your login credentials:\n Username - " +user.getUsername()+"\n Password - "+user.getPassword()+"\nWe recommend you to change the password as soon as you login the first time.\n Regards",
                "Welcome Dr. "+user.getFirstName()+" "+user.getLastName()+" to the Self Help App for Mental Health!!"
        );

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("JWT",
                jwt);
        return ResponseEntity.ok().headers(responseHeaders)
                .body(user);
    }

//    @PostMapping("/changePass/{email}/{pass}") //ADMIN
//    @PreAuthorize("hasAuthority('Doctor')   3")
//    public ResponseEntity<?> changePass(@PathVariable(name="email") String email, @PathVariable(name="pass") String pass)
//    {
//        Patient p  = patientService.findByEmail(email);
//        Doctor d = doctorService.findByEmail(email);
//
//        if(p!=null || d!=null) {
//
//            String u = p!=null?p.getUsername():d.getUsername();
//
//            if(p!=null)
//            {
//                p.setPassword(pass);
//                patientService.save(p);
//            }
//            else{
//                d.setPassword(pass);
//                doctorService.save(d);
//            }
//            userService.changePass(pass,u);
//            return ResponseEntity.ok().body("password change successfully!!!");
//        }
//        else{
//            return new ResponseEntity<>(
//                    "No email Id Found",
//                    HttpStatus.BAD_REQUEST);
//        }
// }
}
