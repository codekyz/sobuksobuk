import { Box, Input } from "@mui/material";
import AvaratImage from "components/atoms/AvatarImage";
import BigButton from "components/atoms/BigButton";
import SmallButton from "components/atoms/SmallButton";
import HelperText from "components/atoms/HelperText";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTextField from "components/atoms/CustomTextField";
import CustomTypography from "components/atoms/CustomTypography";
import {
  useUserNameCheck,
  useNicknameCheck,
  useSignUp,
} from "hooks/mutates/useMemberMutations";
import { useImage } from "hooks/mutates/useImageMutation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValue {
  userName: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  email: string;
  introduction: string;
  image?: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();

  // 회원가입 성공
  const [SuccessSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  // 회원가입 실패
  const [ErrorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  // 프로필 이미지
  const [profileImg, setProfileImg] = useState("");

  // 아이디 중복확인
  const [idChecked, setIdChecked] = useState(false);
  // 닉네임 중복확인
  const [nicknameChecked, setNicknameChecked] = useState(false);

  // react hook form
  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState,
    trigger,
    watch,
  } = useForm<FormValue>({
    defaultValues: {
      userName: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      email: "",
      introduction: "",
      image: "",
    },
    mode: "onChange",
  });

  // react-query - POST signup
  const { mutate: signUpMutate, isSuccess: signUpSuccess } = useSignUp();

  // react-query - POST id check
  const { mutate: userNameCheckMutate } = useUserNameCheck();

  // react-query - POST nickname check
  const { mutate: nicknameCheckMutate } = useNicknameCheck();

  // react-query - POST image
  const { mutate: imageMutate } = useImage();

  // 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 유저에게 보여주기 위한 state
      setProfileImg(URL.createObjectURL(event.target.files[0]));

      // 이미지 url을 얻기위한 요청에 필요한 데이터 형식으로 변경
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      imageMutate(formData, {
        onSuccess: (data) => {
          setValue("image", data.data);
        },
      });
    }
  };

  // 아이디 중복확인 함수
  const handleIdCheck = async (
    userName: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const isValid = await trigger("userName");
    if (isValid) {
      userNameCheckMutate(
        { userName },
        {
          onSuccess: () => {
            setIdChecked(true);
          },
          onError: () => {
            setIdChecked(false);
          },
        },
      );
    }
  };

  // 닉네임 중복확인 함수
  const handleNicknameCheck = async (
    nickname: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const isValid = await trigger("nickname");
    if (isValid) {
      nicknameCheckMutate(
        { nickname },
        {
          onSuccess: () => {
            setNicknameChecked(true);
          },
          onError: () => {
            setNicknameChecked(false);
          },
        },
      );
    }
  };

  // Id 필드 값이 변경될 때 중복확인 state를 초기화
  const handleChangeUserName = () => {
    if (idChecked) {
      setIdChecked(false);
    }
  };

  // Nickname 필드 값이 변경될 때 중복확인 state를 초기화
  const handleChangeNickname = () => {
    if (nicknameChecked) {
      setNicknameChecked(false);
    }
  };

  // 회원가입 버튼 함수
  const handleSignUp = (data: FormValue) => {
    if (idChecked && nicknameChecked) {
      signUpMutate(
        {
          ...data,
        },
        {
          onSuccess: () => {
            setSuccessSnackBarOpen(true);
          },
          onError: () => {
            setErrorSnackBarOpen(true);
          },
        },
      );
    }
  };

  // SnackBar 닫기 함수
  const handleSnackBarClose = () => {
    setSuccessSnackBarOpen(false);
    setErrorSnackBarOpen(false);

    if (signUpSuccess) {
      navigate("../log-in");
    }
  };

  useEffect(() => {
    if (watch("userName")) {
      setIdChecked(false);
    }
  }, [watch("userName")]);

  useEffect(() => {
    if (watch("nickname")) {
      setNicknameChecked(false);
    }
  }, [watch("nickname")]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
        mb: 10,
      }}
    >
      {/* 회원가입 성공 */}
      <CustomSnackBar
        text="회원가입이 완료되었습니다."
        severity="success"
        open={SuccessSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 회원가입 실패 */}
      <CustomSnackBar
        text="회원가입 중 오류가 발생했습니다."
        severity="success"
        open={ErrorSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 회원가입 폼 */}
      <form>
        <CustomTypography variant="h5" text="회원가입" bold={true} />
        {/* 아이디 입력 및 중복확인 */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomTextField
            name="userName"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9]{2,15}$/,
                message: "아이디는 영문과 숫자만 입력가능합니다.(2~15자)",
              },
            }}
            textFieldProps={{
              id: "user-name",
              label: "아이디",
              placeholder: "아이디를 입력하세요.",
              onChange: handleChangeUserName,
            }}
          />
          <SmallButton
            buttonText="중복확인"
            outline={false}
            handleClickEvent={(event) =>
              handleIdCheck(getValues("userName"), event)
            }
          />
        </Box>
        <HelperText text={formState.errors.userName?.message} />

        {!idChecked && (
          <HelperText text="중복된 아이디이거나 중복확인이 되지 않았습니다." />
        )}

        {idChecked && (
          <HelperText
            text="아이디 중복확인이 완료되었습니다."
            status="success"
          />
        )}

        {/* 비밀번호 입력 */}
        <CustomTextField
          name="password"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@%^&+-]).{6,15}$/,
              message:
                "비밀번호는 영문과 숫자, 특수문자를 포함해야 합니다.(6~15자)",
            },
          }}
          textFieldProps={{
            type: "password",
            id: "user-password",
            label: "비밀번호",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <HelperText text={formState.errors.password?.message} />

        {/* 비밀번호 확인 입력 */}
        <CustomTextField
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
        {formState.errors.passwordCheck && (
          <HelperText text="위와 동일한 비밀번호를 입력해주세요." />
        )}

        {/* 닉네임 입력 및 중복확인 */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomTextField
            name="nickname"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 2,
                message: "닉네임은 2자 이상 입력해주세요.",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 10자가 넘지 않게 입력해주세요.",
              },
            }}
            textFieldProps={{
              id: "user-nickname",
              label: "닉네임",
              placeholder: "닉네임을 입력하세요.",
              onChange: handleChangeNickname,
            }}
          />

          <SmallButton
            buttonText="중복확인"
            outline={false}
            handleClickEvent={(event) =>
              handleNicknameCheck(getValues("nickname"), event)
            }
          />
        </Box>
        <HelperText text={formState.errors.nickname?.message} />

        {!nicknameChecked && (
          <HelperText text="중복된 닉네임이거나 중복확인이 되지 않았습니다." />
        )}

        {nicknameChecked && (
          <HelperText
            text="닉네임 중복확인이 완료되었습니다."
            status="success"
          />
        )}

        {/* 이메일 입력 */}
        <CustomTextField
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value:
                /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,3}$/,
              message: "형식에 맞는 Email을 입력해주세요.",
            },
          }}
          textFieldProps={{
            id: "user-email",
            label: "이메일",
            placeholder: "이메일을 입력하세요.",
          }}
        />
        <HelperText text={formState.errors.email?.message} />

        {/* 자기소개 입력 */}
        <CustomTextField
          name="introduction"
          control={control}
          textFieldProps={{
            id: "user-introduction",
            label: "자기소개",
            placeholder: "소개글을 입력하세요.",
          }}
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
          <AvaratImage size={100} src={profileImg} />
          <Input type="file" onChange={handleChangeImg} name="img" />
          {!profileImg && (
            <HelperText text="프로필 사진을 등록해보세요." status="success" />
          )}
        </Box>

        {/* 회원가입 버튼 */}
        <BigButton
          text="회원가입"
          handleClickEvent={handleSubmit(handleSignUp)}
        />

        {/* 취소 버튼 */}
        <BigButton
          text="취소"
          handleClickEvent={() => navigate("../log-in")}
          disabled={true}
        />
      </form>
    </Box>
  );
};
export default SignUpPage;
