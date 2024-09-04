import { TitlePage } from "../templates/templates"

const ListParamObj = ({MenuCollapse,theme}) => {
    return(
        <div  className={!MenuCollapse ? "content" : "contentCollapse"}>
            <TitlePage title="Liste parametrage objectif" process={true} theme={theme}/>
        </div>
    )
}

export default ListParamObj;

