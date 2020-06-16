import React, { useEffect, useState } from 'react';
import Header from './Header';
import api from './Api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Switch from '@material-ui/core/Switch';
import {Dialog,DialogActions,TextField,DialogContentText,DialogContent,DialogTitle, MenuItem} from '@material-ui/core';

function Lista(){

    const [ operacaoSistema , setOperacaoSistema ] = useState([]);
    const [ open , setOpen ] = useState(false);
    const [ openUpdate , setOpenUpdate ] = useState(false);

  
    const [ placa , setPlaca ] = useState('');
    const [ nomeCliente , setNomeCliente ] = useState('');
    const [ duracaoMin , setDuracaoMin ] = useState();
    const [ idVaga , setIdVaga] = useState();

    function loadData()
    {
        api.get('/').then(response =>  {

            const operacaoSistema = response.data;
            setOperacaoSistema(operacaoSistema);

        });
        
    }

    useEffect(loadData, []);

    function openDialog()
    {
        setOpen(true);
    }

    function closeDialog()
    {
        setOpen(false);
    }

     function openDialogUpdate(placa,nomeCliente,duracaoMin,idVaga)
    {

     

        setPlaca(placa);
        setNomeCliente(nomeCliente);
        setDuracaoMin(duracaoMin);
        setIdVaga(idVaga);


        setOpenUpdate(true);
    }

    function closeDialogUpdate()
    {
        setOpenUpdate(false);
    }

     async function salvar() { 


          await api.post('/', {placa,nomeCliente,duracaoMin}); 
        loadData();
        closeDialog();

        setPlaca('');
        setNomeCliente('');
        setDuracaoMin();
    }

    async function salvarUpdate() { 


        await api.put(`/`, {idVaga,placa,nomeCliente,duracaoMin});
          
        loadData();
        closeDialogUpdate();

       
        setPlaca('');
        setNomeCliente('');
        setDuracaoMin();
        setIdVaga();
    }


     async function apagar(idVaga) { 
        console.log(idVaga)
        await api.delete(`/${idVaga}`);
        loadData();
    }

    // async function atualizar(id, Ativo) { 

    //     await api.put(`/caixa/id/${id}`, {ativo: Ativo });

    //     loadData();
    // }
  

    return <div style={{marginTop: '70px'}}>
        <Header/>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Placa</TableCell>
            <TableCell align="center">Nome Cliente</TableCell>
            <TableCell align="center">Duração</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          {operacaoSistema.map(item => (
            <TableRow key={item.idVaga}>
                
              <TableCell component="th" scope="row">
                {item.idvaga}
              </TableCell>
              <TableCell align="center">{item.placa}</TableCell>
              <TableCell align="center">{item.nomecliente}</TableCell>
              <TableCell align="center">{item.duracaomin}</TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="primary" onClick={() => openDialogUpdate(item.placa,item.nomecliente,item.duracaomin,item.idvaga)}>  <CreateIcon /> &nbsp;Editar </Button> </TableCell>
              <TableCell align="center" style={{width: '15px'}}>  <Button variant="outlined" color="secondary" onClick={() => apagar(item.idvaga)}> <DeleteIcon /> &nbsp;Apagar </Button> </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

    <Button  style={{marginTop: '20px'}}
        onClick={openDialog}
        variant="contained" 
        color="primary">
            Adicionar
    </Button>

    <Dialog open ={open}>
         <DialogTitle>Novo Veiculo</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para uma nova entrada de Veiculo.</DialogContentText>
                
                <TextField
                    margin="dense"
                    id="placa"
                    label="Placa"
                    type="text"
                    fullWidth
                    onChange={e => setPlaca(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="nomeCliente"
                    label="Nome Cliente"
                    type="text"
                    fullWidth
                    onChange={e => setNomeCliente(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="duracaoMin"
                    label="Duração"
                    type="number"
                    fullWidth
                    onChange={e => setDuracaoMin(e.target.value)}
                />        
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancelar</Button>
                <Button onClick={salvar}>Salvar</Button>
            </DialogActions>
    </Dialog>

    <Dialog open ={openUpdate}>
         <DialogTitle>Atualizar Veiculo</DialogTitle>
            <DialogContent>
                <DialogContentText>Preencha os dados para atualizar um Veiculo.</DialogContentText>
                     
                <TextField
                    margin="dense"
                    id="placa"
                    label="Placa"
                    value={placa}
                    type="text"
                    fullWidth
                    onChange={e => setPlaca(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="nomeCliente"
                    label="Nome Cliente"
                    value={nomeCliente}
                    type="text"
                    fullWidth
                    onChange={e => setNomeCliente(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="valor"
                    label="Valor"
                    value={duracaoMin}
                    type="number"
                    fullWidth
                    onChange={e => setDuracaoMin(e.target.value)}
                />     
                
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogUpdate}>Cancelar</Button>
                <Button onClick={salvarUpdate}>Salvar</Button>
            </DialogActions>
    </Dialog>
    
        </div>
    
}


export default Lista