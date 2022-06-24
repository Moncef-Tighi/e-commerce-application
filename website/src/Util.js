import {Snackbar, Alert} from "@mui/material";

function Notification({message, status, closeNotif}) {
    return (<>             
                <Snackbar open={message !== ""} autoHideDuration={3000} onClose={closeNotif}>
                    <Alert onClose={closeNotif} severity={status} sx={{width: '100%'}}>{message}</Alert>
                </Snackbar></>
    );
}

export default Notification