import background from './images/background.png';
import './highlightBox.sass';

const HighlightBox = (props) => {
    return (
        <div className='HighlightBox d-flex flex-column align-items-center my-2'>
            <img className='backgroundImage' src={background} />
            {
                props.iconName
                ?
                <i style={{fontSize: '100px'}} className={`${props.iconName} m-5`}></i>
                :
                <img className='thumbnailImg' src={props.thumbnail} />
            }
            <span className='labelText text-uppercase fw-bold'>{props.label}</span>
        </div>
    );
};

export default HighlightBox;