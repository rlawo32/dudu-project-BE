package com.cac.duduproject.util.oauth;

import com.cac.duduproject.jpa.domain.member.Member;
import com.cac.duduproject.jpa.repository.member.MemberRepository;
import com.cac.duduproject.util.oauth.dto.OAuth2RequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest); // OAuth2 정보를 가져옴

        Map<String, Object> originAttributes = oAuth2User.getAttributes(); // OAuth2User의 attribute

        // OAuth2 서비스 ID(google, kakao, naver)
        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보를 가져옴

        OAuth2RequestDto oAuth2RequestDto = OAuth2Attributes.extract(registrationId, originAttributes);
        oAuth2RequestDto.setProvider(registrationId);

        Member member = saveOrUpdate(oAuth2RequestDto);

        // OAuth를 지원하는 소셜 서비스들간의 약속(google=sub, naver=id ...)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName(); // 해당 소셜 서비스에서 유니크한 id값을 전달

        Map<String, Object> customAttribute = customAttribute(originAttributes, userNameAttributeName, oAuth2RequestDto, member.getMemberNo(), registrationId);

        return new DefaultOAuth2User(
                Collections.singleton(
                        new SimpleGrantedAuthority(member.getRoleKey())),
                customAttribute,
                userNameAttributeName
        );
    }

    private Map customAttribute(Map attributes, String userNameAttributeName, OAuth2RequestDto oAuth2RequestDto, Long memberNo, String registrationId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("memberNo", memberNo);
        customAttribute.put("memberName", oAuth2RequestDto.getName());
        customAttribute.put("memberAttributeCode", oAuth2RequestDto.getAttributeCode());
        customAttribute.put("provider", registrationId);

        return customAttribute;
    }

    private Member saveOrUpdate(OAuth2RequestDto oAuth2RequestDto) {
        Member member = memberRepository.findByMemberAttributeCode(oAuth2RequestDto.getAttributeCode())
                .map(entity -> entity.infoUpdate(oAuth2RequestDto.getName(), oAuth2RequestDto.getProvider()))
                .orElse(oAuth2RequestDto.toOAuth2());

        return memberRepository.save(member);
    }
}
