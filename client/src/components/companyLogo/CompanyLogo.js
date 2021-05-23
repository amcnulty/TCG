import LightLogoSVG from './lightLogo.svg';
import LightLogoTransparentSVG from './lightLogoTransparent.svg';
import DarkLogoSVG from './darkLogo.svg';
import DarkLogoTransparentSVG from './darkLogoTransparent.svg';

const CompanyLogo = (props) => {
    return (
        props.dark
        ?
            <img
                className="CompanyLogo"
                src={props.transparent ? DarkLogoTransparentSVG : DarkLogoSVG}
                alt="Contractors Garage"
            />  
        :
            <img
                className="CompanyLogo"
                src={props.transparent ? LightLogoTransparentSVG : LightLogoSVG}
                alt="Contractors Garage"
            />
    );
};

export default CompanyLogo;