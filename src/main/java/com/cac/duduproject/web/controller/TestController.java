package com.cac.duduproject.web.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class TestController {

    @GetMapping("/test1")
    public void test1(HttpServletRequest request) {

        Cookie[] ck = request.getCookies();
        for(int i = 0; ck != null && i < ck.length; i++) {
            System.out.println(ck[i].getName() + ": " + ck[i].getValue());
        }

        System.out.println("jwt token test !");
    }
}
