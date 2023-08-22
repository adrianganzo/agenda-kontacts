import '@fontsource/rokkitt/700.css';
import {
  Button, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import del from "../../assets/delete.svg";
import edit from "../../assets/edit.svg";
import logout from "../../assets/logout.svg";
import ModalCriar from "../../components/ModalCriar";
import ModalEditar from "../../components/ModalEditar";
import ModalExcluir from "../../components/ModalExcluir";
import api from "../../services/api";
import "./styles.css";

const columns = [
  { id: "nome", label: "Nome", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "telefone", label: "Telefone", minWidth: 100 },
  { id: "actions", label: "", maxWidth: 50 },
];

export default function Home() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [criar, setCriar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [excluir, setExcluir] = useState(false);
  const [dados, setDados] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    contacts();
  }, [criar, editar, excluir]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogoff = async () => {
    localStorage.removeItem("token");

    navigate("/");
  }

  const contacts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get("/contatos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    setCriar(false);
    setEditar(false);
    setExcluir(false);
  }

  return (
    <>
      <header>
        <Typography variant="h1" sx={{
          flexGrow: 2,
          color: "#FFF",
          textAlign: "center",
          fontFamily: "Rokkitt",
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
        }}>
          KONTACTS
        </Typography>
        <img onClick={handleLogoff} src={logout} alt="Logout" />
      </header>
      <div className='container-btn'>
        <Button
          onClick={() => {
            setCriar(true);
          }}
          variant='contained'
          sx={{
            width: "235px", height: "50px", margin: "104px", color: "#ffffff",
            backgroundColor: "#04C45C", "&:hover": { backgroundColor: "#04C45C" }
          }}
          type='submit'
        >
          Adicionar
        </Button>
      </div>
      <div className='container-table'>
        <Paper sx={{
          width: "956px", overflow: "hidden"
        }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell>{row.nome}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.telefone}</TableCell>
                        <TableCell sx={{ maxWidth: "42px" }}>

                          <img
                            className="table-edit-img"
                            src={edit}
                            alt="Editar"
                            onClick={(event) => {
                              setDados({ ...dados, id: row.id, nome: row.nome, telefone: row.telefone, email: row.email });
                              setEditar(true);
                            }}
                          />

                          <img
                            src={del}
                            alt="Deletar"
                            onClick={(event) => {
                              setDados({ ...dados, id: row.id, nome: row.nome });
                              setExcluir(true);
                            }}
                          />

                          {editar && <ModalEditar id={dados.id} dados={dados} editar={editar} closeModal={closeModal} />}
                          {excluir && <ModalExcluir id={dados.id} nome={dados.nome} excluir={excluir} closeModal={closeModal} />}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      {criar && <ModalCriar criar={criar} closeModal={closeModal} />}
    </>
  );
}