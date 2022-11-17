import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
//
import TextField from "@mui/material/TextField";
import LimitTags from "./EmailList";
import TopicsSelect from "./Topics";
import BasicDateTimePicker from "./Calendar";
import { useNewsLetter } from "./useNewsLetter";

const BootstrapDialog = styled(Dialog)(({ theme, sx }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  sx: sx,
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddNewsLetter({ open, handleClose, onSuccess }) {
  const {
    submit,
    fileHandleChange,
    selectRecipients,
    setSelectedTopic,
    setScheduledAt,
    file,
    title,
    selectedTopic,
    scheduledAt,
    selectedRecipients,
    topics,
    recipients,
    isLoading,
    submiting,
  } = useNewsLetter();

  const handleSubmit = () => {
    submit().then(() => {
      handleClose();
      onSuccess();
    });
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add News Letter
        </BootstrapDialogTitle>
        <DialogContent>
          <TextField
            id={"file"}
            label={"File"}
            variant={"standard"}
            fullWidth={true}
            type={"file"}
            onChange={fileHandleChange}
          />
          <Box sx={{ mt: 2 }}>
            <TextField
              id={"title"}
              label={"Title"}
              variant={"standard"}
              fullWidth={true}
              inputProps={{ maxlength: "50" }}
              {...title}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TopicsSelect
              data={topics}
              selectedValue={selectedTopic}
              onChange={setSelectedTopic}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <BasicDateTimePicker
              value={scheduledAt}
              setValue={setScheduledAt}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <LimitTags
              options={recipients}
              selectedOptions={selectedRecipients}
              selectOptions={selectRecipients}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ mt: 2 }}>
          <Button autoFocus onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
