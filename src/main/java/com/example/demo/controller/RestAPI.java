package com.example.demo.controller;

import com.example.demo.user.UserDAO;
import com.example.demo.user.UserDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class RestAPI {

    @GetMapping("/join")
    public boolean join(UserDTO user){
        String name = user.getName();
        String phone = user.getPhone();
        return UserDAO.start(name,phone);
    }

    @GetMapping("/vote")
    public boolean vote(@RequestParam String name){
        return UserDAO.vote(name);
    }

    @GetMapping("/result")
    public int[] result(){
        return UserDAO.result();
    }
}
