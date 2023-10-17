import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  userName: string;
  userPostCount: number;
}

const UserPostList: React.FC<PropsType> = (props) => {
  return (
    <Box>
      {/* title */}
      <Box
        sx={{
          display: "flex",
          pt: 2,
          mt: 2,
        }}
      >
        <CommonTitle
          value={
            "📓 " +
            props.userName +
            "님의 독서기록은 총 " +
            props.userPostCount +
            "개가 있어요"
          }
        />
      </Box>

      {/* 유저 독서기록 영역 */}
      <Grid
        container
        columns={{ xs: 1, md: 3 }}
        sx={{
          width: "100%",
          backgroundColor: "primary.main",
          borderRadius: 5,
          border: "1px solid",
        }}
      >
        {/* 유저 독서기록 item */}
        <Grid xs={1} md={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.default",
              borderRadius: 5,
              p: 2,
              m: 2,
            }}
          >
            <CommonBookImage width={100} height={150} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ml: 2,
              }}
            >
              <CommonTypography value="책 제목" variant="h6" bold={true} />
              <CommonTypography value="지은이" variant="body2" bold={false} />
              <CommonTypography
                value="독서기록 제목"
                variant="body2"
                bold={false}
              />
              <Box sx={{ display: "flex", mt: 1 }}>
                <CommonTypography
                  value="📄댓글수"
                  variant="body2"
                  bold={true}
                />
                <CommonTypography
                  value="✨추천수"
                  variant="body2"
                  bold={true}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPostList;
