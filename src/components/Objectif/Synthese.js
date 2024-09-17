import React, { useState } from 'react';
import axios from 'axios';
import Global_url from '../../global_url';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
var Url = Global_url

const Synthese = ({ isOpen, onClose }) => {
    const [datas, setData] = useState([]);

    function initialiseDonne(){
        const obj= axios.get(Url+"/getParamObjSynthese").then(res=>{
            setData(res.data);
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
  
    return (
      <div className="App">
        <Button variant="primary" onClick={handleShow}>
            <i className='bi bi-archive'></i>
        </Button>
  
        <Modal show={showModal} onHide={handleClose} className='row'>
          <Modal.Header closeButton>
            <Modal.Title>Synthese parametrage objectif</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className='row'>
                <th className='row mb-3'>
                    <td className='col-5'>Processus</td>
                    <td className='col-3'>Nombre objectif</td>
                    <td className='col-4'>Poids total</td>
                </th>
                {
                    datas!==null ?
                    datas.map(data => (
                        <tr className='row mb-2' key={data.id_processu}>
                            <td className='col-5'>{data.libelle_processus}</td>
                            <td className='col-3'>{data.nb_objectif}</td>
                            <td className='col-4'>{data.poids}</td>
                        </tr>
                    ))
                    :
                    <></>
                }
            </table>
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

export default Synthese;
