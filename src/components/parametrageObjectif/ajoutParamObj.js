import { TitlePage } from "../templates/templates"

const AjoutParamObj = ({MenuCollapse,theme}) => {
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Ajout parametrage objectif" process={true} theme={theme}/>
            <table className="row">
                <tr className="row">
                    <th className="col-5">Objectif</th>
                    <th className="col-1">poids</th>
                    <th className="col-1">cible</th>
                    <th className="col-1">unite</th>
                    <th className="col-2">recuperation</th>
                    <th className="col-2"></th>
                </tr>
                <tr>
                    <td className="col-5"><input className="col-12" type="text" name="objectif"></input></td>
                    <td className="col-1"><input className="col-12" type="text" name="poids"></input></td>
                    <td className="col-1"><input className="col-12" type="text" name="cible"></input></td>
                    <td className="col-1">
                        <select className="col-12"  name="unite">
                            <option value="1"></option>
                            <option value="2">%</option>
                        </select>
                    </td>
                    <td className="col-2">
                        <select className="col-12"  name="recuperation">
                            <option value="1">Manuel</option>
                            <option value="2">Auto</option>
                        </select>
                    </td>
                    <td className="col-2">
                        <button>Ajout</button>
                        <button>Supprimer</button>
                    </td>
                </tr>
            </table>
            <button>New</button>

        </div>
    )
}

export default AjoutParamObj;

