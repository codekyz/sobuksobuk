package reading.project.global.member.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.global.member.dto.MemberDto;

import javax.management.relation.Role;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "Member")
public class Member {
    // 생성자에만 builder 사용
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    @Transient // 비밀번호 확인을 위한 db 저장 방지(직렬화 과정 제외)
    private String confirmPassword;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column
    private String introduction;

    @Column
    private String image;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder //NoArgsContructor 오류 방지를 위한 생성자에 @Builder 붙이기
    public Member(String userName, String password, String nickname, String email, String introduction, String image, Role role) {
        this.userName = userName;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
        this.introduction = introduction;
        this.image = image;
        this.role = role;
    }

    public enum Role {
        ROLE_USER, ROLE_ADMIN
    }

    public Member update(MemberDto.Patch request) {
        this.nickname = request.getNickname();
        this.introduction = request.getIntroduction();
        this.image = request.getImage();
        return this;
    }
}