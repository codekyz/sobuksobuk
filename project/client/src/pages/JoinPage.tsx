import { Box, Input } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonLink from "components/common/CommonLink";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValue {
  id: string;
  password: string;
  passwordCheck: string;
  nickName: string;
  email: string;
  introduce: string;
  img?: string;
}

const JoinPage = () => {
  // 에러메세지
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const navigate = useNavigate();

  // react hook form
  const { getValues, control, handleSubmit, formState } = useForm<FormValue>({
    defaultValues: {
      id: "",
      password: "",
      passwordCheck: "",
      nickName: "",
      email: "",
      introduce: "",
      img: "",
    },
    mode: "onChange",
  });

  // 프로필 이미지
  const [profileImg, setProfileImg] = useState("");

  // 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 회원가입 버튼 함수
  const handleJoin = (data: FormValue) => {
    data.img = profileImg;
    console.log(data);
    setSnackBarOpen(true);
  };

  const handleClose = () => {
    setSnackBarOpen(false);
    navigate("../login");
  };

  // 검증 로직에 따른 에러 메세지 표시
  useEffect(() => {
    if (formState.errors.id) {
      setErrorMessage("ID는 영문과 숫자만 입력가능합니다.(2~15자)");
    } else if (formState.errors.password) {
      setErrorMessage(
        "Password는 영문과 숫자, 특수문자를 포함해야 합니다.(6~15자)",
      );
    } else if (formState.errors.passwordCheck) {
      setErrorMessage("위와 동일한 Password를 입력해주세요.");
    } else if (formState.errors.nickName) {
      setErrorMessage("닉네임은 필수 입력입니다.(2~10자)");
    } else if (formState.errors.email) {
      setErrorMessage("형식에 맞는 Email을 입력해주세요.");
    } else {
      setErrorMessage("");
    }
  }, [formState]);

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

      {/* snackbar */}
      <CommonSnackBar
        value="회원가입이 완료되었습니다."
        severity="success"
        open={snackBarOpen}
        handleClose={handleClose}
      />

      {/* 회원가입 폼 */}
      <form>
        <CommonTextField
          name="id"
          control={control}
          rules={{ required: true, pattern: /^[a-zA-Z0-9]{2,15}$/ }}
          textFieldProps={{
            id: "user-id",
            label: "아이디",
            placeholder: "아이디를 입력하세요.",
          }}
        />
        <CommonTextField
          name="password"
          control={control}
          rules={{
            required: true,
            pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@%^&+-]).{6,15}$/,
          }}
          textFieldProps={{
            type: "password",
            id: "user-password",
            label: "비밀번호",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <CommonTextField
          name="passwordCheck"
          control={control}
          rules={{
            required: true,
            pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@%^&+-]).{6,15}$/,
            validate: (value) => value === getValues("password"),
          }}
          textFieldProps={{
            type: "password",
            id: "user-password-check",
            label: "비밀번호 확인",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <CommonTextField
          name="nickName"
          control={control}
          rules={{ required: true, minLength: 2, maxLength: 10 }}
          textFieldProps={{
            id: "user-name",
            label: "닉네임",
            placeholder: "닉네임을 입력하세요.",
          }}
        />
        <CommonTextField
          name="email"
          control={control}
          rules={{
            required: true,
            pattern:
              /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,3}$/,
          }}
          textFieldProps={{
            id: "user-email",
            label: "이메일",
            placeholder: "이메일을 입력하세요.",
          }}
        />
        <CommonTextField
          name="introduce"
          control={control}
          textFieldProps={{
            id: "user-introduce",
            label: "자기소개",
            placeholder: "소개글을 입력하세요.",
          }}
        />

        {/* error message */}
        <CommonTypography
          value={errorMessage}
          variant="body2"
          bold={true}
          error={true}
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
          <Input type="file" onChange={handleChangeImg} name="img" />
        </Box>

        {/* 회원가입 버튼 */}
        <CommonBigButton value="회원가입" onClick={handleSubmit(handleJoin)} />
      </form>
    </Box>
  );
};
export default JoinPage;
