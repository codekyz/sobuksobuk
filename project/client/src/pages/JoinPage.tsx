import { Box, Input } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonLink from "components/common/CommonLink";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

const JoinPage = () => {
  // 프로필 이미지
  const [profileImg, setProfileImg] = React.useState<string>("");

  // 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 회원가입 버튼 함수
  const handleJoin = () => {
    console.log("join");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
      }}
    >
      {/* HOME 버튼 */}
      <Box sx={{ position: "fixed", top: "30px", right: "30px" }}>
        <CommonLink to="../main">
          <CommonTypography value="🏠HOME" variant="body1" bold={true} />
        </CommonLink>
      </Box>

      {/* 회원가입 폼 */}
      <CommonTextField
        type="required"
        id="user-id"
        label="아이디"
        placeholder="아이디를 입력하세요."
      />
      <CommonTextField
        type="password"
        id="user-password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
      />
      <CommonTextField
        type="password"
        id="user-password-check"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력하세요"
      />
      <CommonTextField
        type="required"
        id="user-name"
        label="닉네임"
        placeholder="닉네임을 입력하세요."
      />
      <CommonTextField
        type="required"
        id="user-email"
        label="이메일"
        placeholder="이메일을 입력하세요."
      />
      <CommonTextField
        type="required"
        id="user-introduce"
        label="자기소개"
        placeholder="소개글을 입력하세요."
      />

      {/* 프로필 사진 업로드 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <CommonAvaratImage size={100} src={profileImg} />
        <Input type="file" onChange={handleChangeImg} />
      </Box>

      {/* 회원가입 버튼 */}
      <CommonBigButton value="회원가입" onClick={handleJoin} />
    </Box>
  );
};
export default JoinPage;
