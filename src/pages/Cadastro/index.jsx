import { Box, Button, FormControl, FormHelperText, InputLabel, Link, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagem_cadastro from "../../assets/imagem_direita.png";
import api from "../../services/api";
import "./styles.css";
import '@fontsource/roboto/700.css';

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: ""
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
      if (!form.confirmarSenha) {
        return setErro("Confirmação de senha obrigatória!");
      }
      if (form.senha !== form.confirmarSenha) {
        return setErro("Confirmação de senha incorreta!");
      }

      const response = await api.post("/usuarios", {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });
      setErro("");
      navigate("/login");
    } catch (error) {
      setErro(error.response.data);
    }
  }

  return (
    <div className='container'>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: "16px"
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

        <Typography variant="h3" sx={{
          maxWidth: "476px", marginBottom: "34px", textAlign: "center",
          fontFamily: "Roboto", fontSize: "24px",
          fontStyle: "normal", fontWeight: 700, lineHeight: "normal"
        }}>
          Cadastre-se
        </Typography>

        <FormControl variant="outlined">
          <InputLabel
            htmlFor="component-outlined"
            color="primary"
          >
            Nome
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            name="nome"
            color="primary"
            sx={{ width: "476px" }}
            onChange={handleChange}
          />
        </FormControl>
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
            htmlFor="component-outlined"
            color="primary"
          >
            Senha
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            type='password'
            label="Senha"
            name="senha"
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
            Confirmar senha
          </InputLabel>
          <OutlinedInput
            id={!erro ? "component-outlined" : 'component-error'}
            type='password'
            label="Confirmar senha"
            name="confirmarSenha"
            color={!erro ? "primary" : "error"}
            sx={{ width: "476px" }}
            onChange={handleChange}
          />
          <FormHelperText id="component-error-text" sx={{ color: "#ff0000" }}>{erro}</FormHelperText>
        </FormControl>

        <Button
          variant='contained'
          sx={{ width: "476px", height: "50px", marginTop: !erro ? "56px" : "37px", color: "#ffffff", backgroundColor: "#04C45C", "&:hover": { backgroundColor: "#04C45C" } }}
          type='submit'
        >
          CADASTRAR
        </Button>
        <Button
          variant="contained"
          sx={{ width: "476px", height: "50px", color: "#ffffff", backgroundColor: "#FB0615A6", "&:hover": { backgroundColor: "#FB0615A6" } }}
          type='button'
        >
          CANCELAR
        </Button>

        <Typography sx={{ marginTop: "80px" }}>Já tem cadastro? <Link href='/' underline='none'>Clique aqui!</Link></Typography>

      </Box>
      <img src={imagem_cadastro} alt="Imagem de Cadastro" />

    </div >
  );
}