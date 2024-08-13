import React, { useState } from "react";
import { read, utils, writeFile } from 'xlsx';

const Importcsv= ({MenuCollapse,theme,logo}) => {
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
       <div className="content">
           <div className="titlePage shadow-sm d-flex justify-content-between bg-white ">
               <span className="">Importcsv</span>
                 <img src={logo} width="40" className=""></img>
            </div>
           <div className="shadow rounded-sm bg-white p-3">
                <div className="row mb-2 p-1 ">
                    <h3>Exemplaire d'importation</h3>
                    <hr></hr>
                    <div className="input-group">
                        <div className="custom-file">
                            <input type="file" name="file" className="form-control" id="inputGroupFile" required onChange={handleImport}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <table className="table">
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
           </div>
       </div>
   );
};
export default Importcsv;