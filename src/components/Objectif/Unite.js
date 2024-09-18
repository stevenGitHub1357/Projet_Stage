import React, { useState } from 'react';
import axios from 'axios';
import Global_url from '../../global_url';
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUniteData,addUnite } from '../feature/objectifs.slice';
import { Confirmation, Success } from '../service/service-alert';

var Url = Global_url


const Unite = ({theme, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const datas = useSelector((state) => state.unite.Unite)

    function initialiseDonne(){
        const obj= axios.get(Url+"/getParamObjUnite").then(res=>{
            dispatch(setUniteData(res.data));
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
    const confirmationUnite = (unite) => {
      const verif = datas.filter(data => data.abbrv.toLowerCase() === unite.abbrv.toLowerCase() || data.type_unite.toLowerCase()===unite.type_unite.toLowerCase());
      console.log(unite)
      if(verif.length !== 0){
        Confirmation(theme, "Uniter '"+ verif[0].type_unite +"("+verif[0].abbrv+")' existe déja", "Ajouter", true).then(
          (result) => {
              if (result.isConfirmed) {
                  Success(theme, "Ajout unité terminer");
                  const obj = axios.post(Url+"/insertParamObjUnite",{unite}).then(res=>{
                      dispatch(addUnite(unite));
                      console.log(res.data)
                  })
              }
          }
      );
      }else{
        Success(theme, "Ajout unité terminer");
        const obj = axios.post(Url+"/insertParamObjUnite",{unite}).then(res=>{
            dispatch(addUnite(unite));
            console.log(res.data)
        })
      }
      initialiseDonne()
      
    }
 
    const handleAdd = (event) => {
      event.preventDefault();
      const nom = event.currentTarget.elements.nom.value;
      const abbrv = event.currentTarget.elements.abbrv.value;
      console.log('add')
      console.log(nom +" "+ abbrv)
      let unite = {};
      unite.type_unite = nom; 
      unite.abbrv = abbrv;
      confirmationUnite(unite)
      setShowModal(false);
        
    }
  
    return (
      <div className="App">
        <OverlayTrigger placement="top" overlay={<Tooltip>Ajouter une unite</Tooltip>}>
          <Button className='btn btn-success btn-sm shadow ms-2' onClick={handleShow}> 
              <i class="bi bi-plus-square"></i>
          </Button>
        </OverlayTrigger>
  
        <Modal show={showModal} onHide={handleClose} className='row'>
          <Modal.Header closeButton>
            <Modal.Title>Ajout unite</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="nom">
                <Form.Label>Type Uniter</Form.Label>
                <Form.Control
                  type="text"
                  name="nom"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="abbrv">
                <Form.Label>Abbreviation</Form.Label>
                <Form.Control
                  type="text"
                  name="abbrv"
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

export default Unite;
