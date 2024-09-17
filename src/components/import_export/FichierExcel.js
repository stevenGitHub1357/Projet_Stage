import React from 'react';
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx'
import { useDispatch, useSelector } from 'react-redux';
import { setImportData } from "../feature/importExport.slice"
import { format } from 'date-fns'

function FichierExcel({action}) {
  const dispatch = useDispatch();
  const [fichier, setFichier] = React.useState(null);
  const [up, setUp] = React.useState(false);
  const importData = useSelector((state) => state.import.import)
  const exportData = useSelector((state) => state.export.export)
  const headings = useSelector((state) => state.export.headings)
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      try {
        const data = await readExcelFile(file);
        setFichier(data);
        dispatch(setImportData(data))
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
      }
    } else {
      console.error('Veuillez sélectionner un fichier Excel (.xlsx)');
    }
  };

  const handleFileDownload = () => {
    console.log(headings)
    console.log(exportData)
		const wb = utils.book_new()
		const ws = utils.json_to_sheet([])
		utils.sheet_add_aoa(ws, [headings])
		utils.sheet_add_json(ws, exportData, { origin: 'A2', skipHeader: true })
		utils.book_append_sheet(wb, ws, 'Report')
		writeFile(wb, 'exportExcel' + format(new Date(), 'ddmmyyyy') + '.xlsx')
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const data = event.target.result;
        
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
        
        resolve(jsonData);
      };
      
      reader.onerror = (error) => reject(error);
      
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUp = () => {
      setUp(true)
  }

  return (
    <div className='row mb-3'>
    {
    action === "1" ?
    <div>
      {
        !up ?
      <button className="btn btn-success float-right" onClick={handleUp}>Import fichier excel <i className="bi bi-upload"></i></button>
        :
      <input className="btn btn-success float-right" type="file" accept=".xlsx" onChange={handleFileUpload}/>
      }
    </div>
    :
    action === "2" ?
    <div>
      <button className="btn btn-success float-right" onClick={handleFileDownload}>Export Excel <i className="bi bi-download"></i></button>
    </div>
    :
    <>null</>
    }
    </div>
  );
}

export default FichierExcel;
