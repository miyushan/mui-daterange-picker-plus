import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import type { ModalCustomProps } from "../types/utils";

const CancelButtonStyled = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: 13,
  fontWeight: 400,
  borderRadius: "8px",
  marginRight: "8px",
  padding: "0 16px",
  height: "36px",
  color: theme.palette.grey[600],
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const ApplyButtonStyled = styled(Button)({
  fontSize: 13,
  fontWeight: 400,
  borderRadius: "8px",
  textTransform: "none",
  height: "36px",
  padding: "0 16px",
});

type ActionsProps = Omit<ModalCustomProps, "onSubmit"> & {
  onSubmit: () => void;
};

export const Actions = ({ onCloseCallback, onSubmit }: ActionsProps) => {
  return (
    <>
      <Grid2>
        <CancelButtonStyled
          disableRipple
          disableElevation
          variant="text"
          onClick={onCloseCallback}
        >
          Cancel
        </CancelButtonStyled>
      </Grid2>

      <Grid2>
        <ApplyButtonStyled
          disableRipple
          disableElevation
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Apply Range
        </ApplyButtonStyled>
      </Grid2>
    </>
  );
};
