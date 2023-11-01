import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import React from "react";
import { useForm } from "react-hook-form";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  selectedUserBook: BookItem;
  handleClose: () => void;
}

interface FormValue {
  todayPages: number;
}

const MainBookProgressDialog: React.FC<PropsType> = (props) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // react hook form
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      todayPages: 0,
    },
  });

  const handleDialogData = (data: FormValue) => {
    reset();
    props.handleClose();
    // input 값 number 형식으로 변경 필요
    console.log(data);
  };

  // dialog 전체 에러 메세지 추가 필요

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      {/* 제목 */}
      <DialogTitle>🔖 오늘 읽은 페이지 기록하기</DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            오늘은 몇 페이지까지 읽었나요? 기록하고 완독까지 달려보세요!
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "primary.main",
                borderRadius: 5,
                p: 1,
                m: 1,
              }}
            >
              <CommonTypography
                value={props.selectedUserBook.bookName}
                variant="h6"
                bold={true}
              />
              <CommonTypography
                value={
                  props.selectedUserBook.bookWriter +
                  " | " +
                  props.selectedUserBook.bookPublish
                }
                variant="body1"
                bold={false}
              />
              <CommonTypography
                value={
                  props.selectedUserBook.bookPages +
                  "쪽 중에 " +
                  (props.selectedUserBook.bookProgress
                    ? props.selectedUserBook.bookProgress
                    : "정보없음") +
                  " 쪽 까지 읽었어요."
                }
                variant="body1"
                bold={false}
              />
            </Box>
            <CommonTextField
              name="todayPages"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  props.selectedUserBook.bookProgress === undefined
                    ? value > 0
                    : value > props.selectedUserBook.bookProgress,
              }}
              textFieldProps={{
                id: "today-pages",
                label: "Today Pages",
                placeholder: "오늘은 몇 페이지까지 읽었나요?",
                type: "number",
              }}
            />
          </Box>
        </DialogContent>
      </form>

      {/* 하단 버튼 */}
      <DialogActions>
        <Button onClick={props.handleClose}>취소</Button>
        <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MainBookProgressDialog;
