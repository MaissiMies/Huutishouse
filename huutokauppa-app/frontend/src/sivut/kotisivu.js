import { KayttajaUL } from "../Komponentit/KayttajaList";
import { KategoriaUL } from "../Komponentit/kategoriatUL";


export default function Kotisivu(){
    return(
    <div> 
    <h1>Kotisivu</h1>
    <p>tämä on kotisivu</p>
    <KayttajaUL/>
    </div>
    )
}



