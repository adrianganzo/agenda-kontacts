import { Box, Button, FormControl, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import closeBtn from "../../assets/close.svg";
import api from "../../services/api";

export default function ModalEditar({ id, dados, editar, closeModal }) {

  const [form, setForm] = useState({
    nome: dados.nome,
    telefone: dados.telefone,
    email: dados.email
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [key]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await api.put(`/contatos/${id}`,
        {
          nome: form.nome,
          telefone: form.telefone,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setErro("");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClear = () => {
    setForm({
      ...form,
      nome: "",
      telefone: "",
      email: ""
    })
  }

  return (
    <div
      className="container-create"
    >
      <Modal
        open={editar}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "476px",
            bgcolor: 'background.paper',
            borderRadius: '8px'
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", alignSelf: "flex-end", position: "relative", margin: "24px 24px 0 0", width: "16px" }}>
            <img
              src={closeBtn}
              alt="Botão para fechar"
              onClick={closeModal}
            />
          </Box>
          <Typography variant="h3" sx={{
            maxWidth: "364px", marginBottom: "34px", textAlign: "center",
            fontFamily: "Roboto", fontSize: "24px",
            fontStyle: "normal", fontWeight: 700, lineHeight: "normal"
          }}>
            Editar Contato
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
              type="text"
              label="Name"
              name="nome"
              value={form.nome}
              color="primary"
              sx={{ width: "364px" }}
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
              value={form.email}
              color="primary"
              sx={{ width: "364px" }}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="component-outlined"
              color="primary"
            >
              Telefone
            </InputLabel>
            <OutlinedInput
              id="component-outlined"
              type='text'
              label="Telefone"
              name="telefone"
              value={form.telefone}
              color="primary"
              sx={{ width: "364px" }}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            variant='contained'
            sx={{
              width: "76%", height: "50px", marginTop: !erro ? "56px" : "37px", color: "#ffffff",
              backgroundColor: "#04C45C", "&:hover": { backgroundColor: "#04C45C" }
            }}
            type='submit'
          >
            SALVAR
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "76%", height: "50px", marginBottom: "75px", color: "#ffffff",
              backgroundColor: "#FB0615A6", "&:hover": { backgroundColor: "#FB0615A6" }
            }}
            type='button'
            onClick={handleClear}
          >
            CANCELAR
          </Button>

        </Box>
      </Modal>
    </div >
  );
}