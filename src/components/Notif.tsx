import { Alert } from "@mui/material";

const Notif = ({ message, status, setStatus }: { message: string; status: boolean; setStatus: (status: boolean) => void }) => {
    setTimeout(() => {
        setStatus(false);
    }, 2000);
    return (
        <Alert className="absolute w-full z-10 top-0 left-0" variant="filled" severity={status ? "success" : "error"}>
            {message}
        </Alert>
    );
};

export default Notif;
