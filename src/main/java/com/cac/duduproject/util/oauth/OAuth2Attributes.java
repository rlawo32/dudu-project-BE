package com.cac.duduproject.util.oauth;

import com.cac.duduproject.util.oauth.dto.OAuth2RequestDto;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuth2Attributes {
    GOOGLE("google", (attributes) -> {
        OAuth2RequestDto oAuth2RequestDto = new OAuth2RequestDto();

        oAuth2RequestDto.setAttributeCode((String) attributes.get("sub"));
        oAuth2RequestDto.setName((String) attributes.get("name"));

        return oAuth2RequestDto;
    }),

    NAVER("naver", (attributes) -> {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        OAuth2RequestDto oAuth2RequestDto = new OAuth2RequestDto();

        oAuth2RequestDto.setAttributeCode((String) response.get("id"));
        oAuth2RequestDto.setName((String) response.get("nickname"));

        return oAuth2RequestDto;
    }),

    KAKAO("kakao", (attributes) -> {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");
        OAuth2RequestDto oAuth2RequestDto = new OAuth2RequestDto();

        oAuth2RequestDto.setAttributeCode(String.valueOf(attributes.get("id")));
        oAuth2RequestDto.setName((String) kakaoProfile.get("nickname"));

        return oAuth2RequestDto;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, OAuth2RequestDto> of;

    OAuth2Attributes(String registrationId, Function<Map<String, Object>, OAuth2RequestDto> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static OAuth2RequestDto extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}
