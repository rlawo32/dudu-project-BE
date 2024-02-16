package com.cac.duduproject.util.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtTokenResponseDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpires;
    private Date accessTokenExpiresDate;
}
