import { Box, Button, FormControl, FormHelperText, InputLabel, Link, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagem_login from "../../assets/imagem_esquerda.png";
import api from "../../services/api";
import "./styles.css";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [key]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email: form.email,
        senha: form.senha
      });
      localStorage.setItem("token", response.data.token);

      setErro("");

      navigate("/home");
    } catch (error) {
      setErro(error.response.data);
    }
  }

  return (
    <div className='container'>
      <img src={imagem_login} alt="Imagem de Login" />
      <div className="container-form">
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "476px",
            gap: "16px"
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <Typography variant="subtitle1" sx={{
              width: "100%", alignSelf: "flex-start", fontFamily: "Roboto", fontSize: "16px",
              fontStyle: "normal", fontWeight: 400, lineHeight: "normal"
            }}>
              Bem vindo
            </Typography>
            <Typography variant="h4" sx={{
              width: "100%", marginBottom: "16px", alignSelf: "flex-start",
              fontFamily: "Roboto", fontSize: "32px",
              fontStyle: "normal", fontWeight: 700, lineHeight: "normal"
            }}>
              Faça login com a sua conta
            </Typography>
          </div>

          <FormControl variant="outlined">
            <InputLabel
              htmlFor="component-outlined"
              color="primary"
            >
              E-mail
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              type='email'
              label="E-mail"
              name="email"
              color="primary"
              sx={{ width: "476px" }}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel
              htmlFor={!erro ? "component-outlined" : "component-error"}
              color={!erro ? "primary" : "error"}
            >
              Senha
            </InputLabel>
            <OutlinedInput
              id={!erro ? "component-outlined" : 'component-error'}
              type='password'
              label="Senha"
              name="senha"
              color={!erro ? "primary" : "error"}
              sx={{ width: "476px" }}
              onChange={handleChange}
            />
            <FormHelperText id="component-error-text" sx={{ color: "#ff0000" }}>{erro}</FormHelperText>
          </FormControl>

          <Button
            variant='contained'
            sx={{ width: "100%", height: "50px", marginTop: !erro ? "56px" : "37px", color: "#ffffff", backgroundColor: "#04C45C", "&:hover": { backgroundColor: "#04C45C" } }}
            type='submit'
          >
            LOGIN
          </Button>

          <Typography sx={{ marginTop: "80px", alignSelf: "center" }}>
            Não tem cadastro?
            <Link href='/cadastro' underline='none' sx={{ marginLeft: "3px" }}>
              Clique aqui!
            </Link>
          </Typography>

        </Box>
      </div>
    </div >
  );
}