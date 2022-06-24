import classes from "./LoginForm.module.css";
import {InputLabel, OutlinedInput, InputAdornment,IconButton, Button} from '@mui/material';
import {Visibility, VisibilityOff, AccountCircle} from '@mui/icons-material'
import { useState } from "react";
import {useNavigate} from 'react-router-dom';


const LoginPage = function() {
    const [showPassword, setPasswordVisibility]=useState(false);
    const [error] = useState("");
    const navigate= useNavigate();

    const handleClickShowPassword = () => {
        setPasswordVisibility(!showPassword);
      };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const login = async (event)=> {
        event.preventDefault();
        navigate("/article");
    }
    

    return (
        <main className={classes.wrapper}>
            <div className={classes.positionning}>
                <h1>S'identifier</h1>
                {error ? <h3>{error}</h3> : ""}
                <form onSubmit={login}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                    id="email"
                    fullWidth={true}
                    placeholder="a.email@pmg.dz"
                    endAdornment={<InputAdornment position="end"> <AccountCircle /></InputAdornment>}
                    />

                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth={true}
                    endAdornment={<InputAdornment position="end">
                    
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>}
                    />
            
                    <Button color="primary" variant="contained" 
                    size="large" sx={ {marginTop: "40px"}} type="submit"
                    >
                        Confirmer</Button>
                </form>


            </div> 
        </main>
        )}

export default LoginPage