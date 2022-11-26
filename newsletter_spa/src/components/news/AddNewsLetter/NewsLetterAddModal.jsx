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
import TextField from "@mui/material/TextField";
import Recipients from "./EmailList";
import TopicsSelect from "./Topics";
import Schedule from "./Calendar";
import { useNewsLetter } from "./useNewsLetter";
import { showErrors } from "/src/components/helpers/showerrors";

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
    errors
  } = useNewsLetter();

  const handleSubmit = (e) => {
    e.preventDefault();
    submit().then(() => {
      handleClose();
      onSuccess();
    }).catch(e => null);
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
          <Box component={"form"}>
            <TextField
              id={"file"}
              label={"File"}
              variant={"standard"}
              fullWidth={true}
              type={"file"}
              onChange={fileHandleChange}
              {...showErrors(errors.file)}
            />
            <Box sx={{ mt: 2 }}>
              <TextField
                id={"title"}
                label={"Title"}
                variant={"standard"}
                fullWidth={true}
                inputProps={{ maxLength: "80" }}
                {...title}
                {...showErrors(errors.title)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TopicsSelect
                data={topics}
                selectedValue={selectedTopic}
                onChange={setSelectedTopic}
                errors={showErrors(errors.topic)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Schedule
                value={scheduledAt}
                setValue={setScheduledAt}
                errors={showErrors(errors.scheduled_at)}
                />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Recipients
                options={recipients}
                selectedOptions={selectedRecipients}
                selectOptions={selectRecipients}
                errors={showErrors(errors.items)}
              />
            </Box>
          </Box>
          <DialogActions sx={{ mt: 2 }}>
            <Button
              autoFocus
              onClick={handleSubmit}
              variant="contained"
              disabled={submiting || isLoading}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
