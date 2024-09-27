import React, { useState } from 'react';
import axios from 'axios';
import Global_url from '../../global_url';
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setProcessusData,addProcessus } from '../feature/processus.slice';
import { Confirmation, Success } from '../service/service-alert';

var Url = Global_url


const Processus = ({theme, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const datas = useSelector((state) => state.processus.processus)

    function initialiseDonne(){
        const obj= axios.get(Url+"/getProcessus").then(res=>{
            dispatch(setProcessusData(res.data));
            console.log(res.data)
        })
        return obj
    }

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(true);
        initialiseDonne();
    }
    const confirmationprocessus = (processus) => {
      console.log(processus)
      const verif = datas.filter(data => data.abbrv.toLowerCase() === processus.abbrv.toLowerCase() || data.libelle_processus.toLowerCase()===processus.libelle_processus.toLowerCase());
      
      if(verif.length !== 0){
        Confirmation(theme, "processus '"+ verif[0].libelle_processus +"("+verif[0].abbrv+")' existe déja", "Ajouter", true).then(
          (result) => {
              if (result.isConfirmed) {
                  Success(theme, "Ajout unité terminer");
                  axios.post(Url+"/insertProcessus",{processus}).then(res=>{
                      dispatch(addProcessus(res.data));
                      console.log(res.data)
                  })
              }
          }
      );
      }else{
        Success(theme, "Ajout unité terminer");
            axios.post(Url+"/insertProcessus",{processus}).then(res=>{
            dispatch(addProcessus(res.data));
            console.log(res.data)
        })
      }
      initialiseDonne()
      
    }
 
    const handleAdd = (event) => {
      event.preventDefault();
      let processus = {};
      processus.libelle_processus = event.currentTarget.elements.libelle.value;
      processus.abbrv = event.currentTarget.elements.abbrv.value;
      processus.excel = event.currentTarget.elements.excel.value;
      processus.num_processus = event.currentTarget.elements.nb.value;
      console.log(processus)
      confirmationprocessus(processus)
      setShowModal(false);
        
    }
  
    return (
      <div className="App">
        <OverlayTrigger placement="top" overlay={<Tooltip>Ajouter une processus</Tooltip>}>
          <Button className='btn btn-success btn-sm shadow ms-2' onClick={handleShow}> 
              <i class="bi bi-plus-square"></i>
          </Button>
        </OverlayTrigger>
  
        <Modal show={showModal} onHide={handleClose} className='row'>
          <Modal.Header closeButton>
            <Modal.Title>Ajout processus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="libelle">
                <Form.Label>Processus</Form.Label>
                <Form.Control
                  type="text"
                  name="libelle"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="abbrv">
                <Form.Label>Abbreviation</Form.Label>
                <Form.Control
                  type="text"
                  name="abbrv"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="nb">
                <Form.Label>Numero de processus</Form.Label>
                <Form.Control
                  type="text"
                  name="nb"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="excel">
                <Form.Label>Libelle en excel</Form.Label>
                <Form.Control
                  type="text"
                  name="excel"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Soumettre
              </Button>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

export default Processus;
