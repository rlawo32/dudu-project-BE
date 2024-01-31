package com.cac.duduproject.web.dto.member;

import com.cac.duduproject.jpa.domain.member.MemberLog;
import lombok.Getter;

@Getter
public class MemberLogResponseDto {

    private Long memberLogNo;
    private String memberLogType;
    private String memberLogIpAddress;
    private String memberLogSuccessYn;
    private String memberLogReason;
    private String memberLogDate;

    public MemberLogResponseDto(MemberLog memberLog) {
        this.memberLogNo = memberLog.getMemberLogNo();
        this.memberLogType = memberLog.getMemberLogType();
        this.memberLogIpAddress = memberLog.getMemberLogIpAddress();
        this.memberLogSuccessYn = memberLog.getMemberLogSuccessYn();
        this.memberLogReason = memberLog.getMemberLogReason();
        this.memberLogDate = memberLog.getMemberLogDate();
    }
}
