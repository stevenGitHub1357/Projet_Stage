import React, { useState } from 'react';
import axios from 'axios';
import Global_url from '../../global_url';
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRecuperationData,addRecuperation } from '../feature/objectifs.slice';
import { Confirmation, Success } from '../service/service-alert';

var Url = Global_url


const Recuperation = ({theme, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const datas = useSelector((state) => state.recuperation.Recuperation)

    function initialiseDonne(){
        const obj= axios.get(Url+"/getParamObjRecuperation").then(res=>{
            dispatch(setRecuperationData(res.data));
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
    const confirmationRecuperation = (recuperation) => {
      const verif = datas.filter(data =>data.type_recuperation.toLowerCase()===recuperation.type_recuperation.toLowerCase());
      console.log(recuperation)
      if(verif.length !== 0){
        Confirmation(theme, "Recuperation '"+ verif[0].type_recuperation +" existe déja", "Ajouter", true).then(
          (result) => {
              if (result.isConfirmed) {
                  Success(theme, "Ajout unité terminer");
                  const obj = axios.post(Url+"/insertParamObjRecuperation",{recuperation}).then(res=>{
                      dispatch(addRecuperation(recuperation));
                      console.log(res.data)
                  })
              }
          }
      );
      }else{
        Success(theme, "Ajout unité terminer");
        const obj = axios.post(Url+"/insertParamObjRecuperation",{recuperation}).then(res=>{
            dispatch(addRecuperation(recuperation));
            console.log(res.data)
        })
      }
      initialiseDonne()
      
    }
 
    const handleAdd = (event) => {
      event.preventDefault();
      const nom = event.currentTarget.elements.nom.value;
      console.log('add')
      console.log(nom)
      let recuperation = {};
      recuperation.type_recuperation = nom; 
      confirmationRecuperation(recuperation)
      setShowModal(false);
        
    }
  
    return (
      <div className="App">
        <OverlayTrigger placement="top" overlay={<Tooltip>Ajouter une methode de recuperation</Tooltip>}>
          <Button className='btn btn-success btn-sm shadow ms-2' onClick={handleShow}> 
              <i class="bi bi-plus-square"></i>
          </Button>
        </OverlayTrigger>
  
        <Modal show={showModal} onHide={handleClose} className='row'>
          <Modal.Header closeButton>
            <Modal.Title>Ajout Recuperation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="nom">
                <Form.Label>Type Recuperationr</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
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

export default Recuperation;
