import { Box, Button, Modal, Typography } from "@mui/material";
import closeBtn from "../../assets/close.svg";
import api from "../../services/api";

export default function ModalExcluir({ id, nome, excluir, closeModal }) {

  const deleteContact = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.delete(`/contatos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="container-create"
    >
      <Modal
        open={excluir}
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
        >
          <Box sx={{ display: "flex", alignSelf: "flex-end", position: "relative", margin: "24px 24px 0 0", width: "16px" }}>
            <img
              src={closeBtn}
              alt="Botão para fechar"
              onClick={closeModal}
            />
          </Box>
          <Typography variant="h3" sx={{
            maxWidth: "364px", marginBottom: "24px", textAlign: "center",
            fontFamily: "Roboto", fontSize: "24px",
            fontStyle: "normal", fontWeight: 700, lineHeight: "normal"
          }}>
            Confirmar a exclusão?
          </Typography>

          <Typography variant="h3" sx={{
            maxWidth: "364px", marginBottom: "31px", textAlign: "center",
            fontFamily: "Roboto", fontSize: "14px",
            fontStyle: "normal", fontWeight: 400, lineHeight: "normal"
          }}>
            {`Deseja excluir o contato, ${nome}?`}
          </Typography>

          <Button
            variant='contained'
            sx={{
              width: "76%", height: "50px", color: "#ffffff",
              backgroundColor: "#04C45C", "&:hover": { backgroundColor: "#04C45C" }
            }}
            type='button'
            onClick={deleteContact}
          >
            EXCLUIR
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "76%", height: "50px", marginTop: "8px", marginBottom: "56px", color: "#ffffff",
              backgroundColor: "#FB0615A6", "&:hover": { backgroundColor: "#FB0615A6" }
            }}
            type='button'
            onClick={closeModal}
          >
            CANCELAR
          </Button>

        </Box>
      </Modal>
    </div >
  );
}