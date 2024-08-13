import Modal from "react-modal"
import React, { useState } from "react"; 
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend, LineElement, PointElement,} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import { read, utils, writeFile } from 'xlsx';
import { TitlePage } from "../templates/templates";

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);



Modal.setAppElement('#root');

const Module= ({MenuCollapse,theme,logo}) => {

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      transition:"0.5s",
      top: '30%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width:"50%",
      transform: 'translate(-50%, -50%)',
    },
  };
  function openModal() { setIsOpen(true);}
  function afterOpenModal() { subtitle.style.color = '#f00';}
  function closeModal() {setIsOpen(false);}

  /* Module Chart*/
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgb(126, 226, 166)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const optionsLine = {
    responsive: true,
    interaction: {mode: 'index',intersect: false},
    stacked: false,
    plugins: {title: {display: true,text: 'Chart.js Line Chart - Multi Axis'}},
    scales: {y: {type: 'linear',display: true,position: 'left',},y1: {type: 'linear',display: true,position: 'right',grid: {drawOnChartArea: false}}},
  }
  
  const dataLine = {
    labels,
    datasets: [
        {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(42, 187, 100)',
        backgroundColor: 'rgb(126, 226, 166)',
        yAxisID: 'y',
        },
        {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
        },
    ],
  }

  /*Module import et export*/
  const [user, setUsers] = useState([]);

  const handleImport = ($event) => {
      const files = $event.target.files;
      if (files.length) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
              const wb = read(event.target.result);
              const sheets = wb.SheetNames;

              if (sheets.length) {
                  const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                  setUsers(rows)
              }
          }
          reader.readAsArrayBuffer(file);
      }
      console.log(user)
  }

  const handleExport = () => {
      const headings = [[
          'ID_utlisateur',
          'Nom',
          'Prenoms',
          'Role'
      ]];
      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings);
      utils.sheet_add_json(ws, user, { origin: 'A2', skipHeader: true });
      utils.book_append_sheet(wb, ws, 'Report');
      writeFile(wb, 'TestExport.xlsx');
  }
  return(
    <div className={!MenuCollapse ? "content" : "contentCollapse"}>
      <TitlePage title="Module" theme={theme}/>
      <div className={!theme ? "card shadow" : "card shadow bg-dark text-white"}>
        <div className="card-body row">
            <div className="col-sm-12">
              <h4> Example Chart</h4>
              <hr></hr>
              <div className="row">
                <div className="col-sm-6">
                  <Bar options={optionsBar} data={dataBar}/>
                </div>
                <div className="col-sm-6">
                  <Line options={optionsLine} data={dataLine} />
                </div>
              </div>
            </div>
            <div className="col-sm-12 mt-5">
              <div className="row">
                <div className="col-sm-6">
                    <h4>Export Import Excel</h4>
                    <hr></hr>
                    <div className="input-group">
                        <div className="custom-file ">
                            <input type="file" name="file" className={!theme ? "form-control" : "form-control darkMode text-white"} id="inputGroupFile" required onChange={handleImport}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                            <strong>Chemin fichier exemple:  </strong> <span>src\components\xlsx\TestImport.xlsx</span>
                        </div>
                        <table className={!theme ? "table mt-2" : "table text-white mt-2"}>
                            <thead>
                                <tr>
                                    <th scope="col">ID Utilisateur</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénoms</th>
                                    <th scope="col">Role</th>
                                </tr>
                            </thead>
                            <tbody> 
                                    {
                                        user.length
                                        ?
                                        user.map((user, index) => (
                                            <tr key={index}>
                                                <td>{ user.ID_utilisateur }</td>
                                                <td>{ user.Nom }</td>
                                                <td>{ user.Prenoms }</td>
                                                <td><span className="badge bg-warning text-dark">{ user.Role }</span></td>
                                            </tr> 
                                        ))
                                        :
                                        <tr>
                                            <td colSpan="5" className="text-center">No User Found.</td>
                                        </tr> 
                                    }
                            </tbody>
                        </table>
                        <button onClick={handleExport} className="btn btn-success float-right">
                            Export <i className="bi bi-download"></i>
                        </button>
                    </div>
                </div>
                <div className="col-sm-6">
                  <h4> React Modal</h4>
                  <hr></hr>
                  <button className={!theme ? "btn btn-outline-dark btn-sm" : "btn btn-primary  btn-sm"} onClick={openModal}>Open Modal</button>
                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                      <div className="modal-header">
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                        <button onClick={closeModal} className="btn btn-outline-dark btn-sm">close</button>
                      </div>
                    </Modal>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
   );
};
export default Module;