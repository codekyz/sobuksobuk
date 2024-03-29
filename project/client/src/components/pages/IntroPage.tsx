import { Box } from "@mui/material";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import SmallButton from "components/atoms/SmallButton";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();

  const handleEnterSobuk = () => {
    navigate("../log-in");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CustomTypography
        text="📚나의 독서 기록을 소북히 쌓아보세요!"
        variant="body1"
        bold={true}
      />
      <SmallButton
        buttonText="✨구경하기✨"
        outline={false}
        handleClickEvent={handleEnterSobuk}
      />

      {/* 임시 이미지 */}
      <Box
        component="img"
        sx={{
          my: 3,
        }}
        src={import.meta.env.BASE_URL + "img/plan_ex.gif"}
      />

      <CustomLink to="https://github.com/cwhite723/sobuksobuk">
        <CustomTypography
          text="📦GITHUB 저장소📦"
          variant="body2"
          bold={true}
        />
      </CustomLink>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 3,
        }}
      >
        <CustomTypography
          text="서버 운영 종료로 실제 서비스 이용이 불가능 합니다😥"
          variant="body2"
          bold={true}
        />
        <CustomTypography
          text="(임시 데이터로 구경하기 기능을 제공하고 있습니다)"
          variant="body2"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default IntroPage;
