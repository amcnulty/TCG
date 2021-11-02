import { useEffect, useState } from 'react';
import { Alert, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Carousel from 'react-gallery-carousel';
import classnames from 'classnames';
import './locationDetail.sass';
import { API } from '../../util/API';
import Payment from '../../components/payment/Payment';

const LocationDetail = (props) => {
    const [location, setLocation] = useState();
    const [activeTab, setActiveTab] = useState('1');
    const [popupState, setPopupState] = useState('collapsed');
    const [showModal, setShowModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState();
    const [paymentApproved, setPaymentApproved] = useState(false);
    const [unitSummaryColumns, setUnitSummaryColumns] = useState(['unitName', 'numberOfUnitsByType', 'monthlyRent', 'width', 'depth', 'squareFeet', 'height']);
    const [unitColumns, setUnitColumns] = useState(['unitName', 'monthlyRent', 'width', 'depth', 'squareFeet', 'height']);

    const UNIT_COLUMNS = ['unitName', 'monthlyRent', 'width', 'depth', 'squareFeet', 'height'];

    const toggleModal = () => setShowModal(!showModal);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        if (props.match.params.id) {
            API.getPreviewLocation(props.match.params.id)
            .then(locationJson => {
                const location = JSON.parse(locationJson.data);
                if (location.unitSummary) {
                    detectUnitSummaryColumns(location.unitSummary);
                }
                if (location.units) {
                    detectUnitColumns(location.units);
                }
                setLocation(location);
            })
            .catch(Function.prototype);
        }
        else {
            API.getLocationBySlug(props.match.params.slug)
            .then(location => {
                detectUnitSummaryColumns(location.unitSummary);
                detectUnitColumns(location.units);
                setLocation(location);
            })
            .catch(Function.prototype);
        }
    }, []);

    const detectUnitSummaryColumns = (unitSummary) => {
        setUnitSummaryColumns(unitSummaryColumns.filter(column => unitSummary.some(unit => unit[column])));
    }

    const detectUnitColumns = (units) => {
        setUnitColumns(unitColumns.filter(column => units.some(unit => unit[column])));
    }

    const getValueForCell = (unit, key) => {
        if (!unit[key]) return '-';
        switch (key) {
            case 'monthlyRent':
                return `$${unit[key].toFixed(2)}`;
            case 'width':
            case 'depth':
            case 'height':
                if (typeof unit[key] === 'string' && !Number(unit[key])) {
                    return unit[key];
                }
                return `${unit[key]} ft`;
            case 'squareFeet':
                return `${unit[key]} sqft`;
            default:
                return unit[key];
        }
    }

    const calculateFees = () => {
        return (parseFloat(calculateTotal()) - parseFloat(paymentAmount)).toFixed(2);
    }

    const calculateTotal = () => {
        const markupPercentage = location.paymentMarkupPercent ? location.paymentMarkupPercent : 0;
        const fixedMarkup = location.paymentMarkupFixed ? location.paymentMarkupFixed : 0;
        return ((parseFloat(paymentAmount) + fixedMarkup) / (1 - markupPercentage)).toFixed(2);
    }

    const scramble = (value) => {
        const parts = [];
        for (let i = 2; i <= value.length; i++) {
            if (i % 2 === 0) {
                parts.push(value.substring(i - 2, i));
            }
            else if (i === value.length) {
                parts.push(value.substring(i - 1));
            }
        }
        return parts;
    }

    if (!location) {
        return (
            <div className="LocationDetail">
                <div className="loadingSection d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='LocationDetail'>
            {
                location.bannerImage && <div
                    className="bannerImage"
                    style={{
                        backgroundImage: `url(${location.bannerImage.src})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                >
                </div>
            }
            <div className="landingSection py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3 mb-md-0">
                            <h1 className='mb-5 fw-light'>{location.name}</h1>
                            <p>{location.longDescription}</p>
                            {(location.contactEmail || location.contactPhone) && <div className="contactInfoBox themeBackground p-3">
                                <h5>Contact Information:</h5>
                                {location.contactName && (
                                    <div className='ms-4'>
                                        <label className='fw-bold'>Contact:</label>&nbsp;<span>{location.contactName}</span>
                                    </div>
                                )}
                                {location.contactEmail && (
                                    <div className='ms-4'>
                                        <label className='fw-bold'>Email:</label>&nbsp;<span>{scramble(location.contactEmail).map((value, index) => <span key={index}>{value}</span>)}</span>
                                    </div>
                                )}
                                {location.contactPhone && (
                                    <div className='ms-4'>
                                        <label className='fw-bold'>Phone:</label>&nbsp;<span>{scramble(location.contactPhone).map((value, index) => <span key={index}>{value}</span>)}</span>
                                    </div>
                                )}
                            </div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <MapContainer
                                center={location.coordinates}
                                zoom={15}
                                dragging={false}
                                zoomControl={false}
                                doubleClickZoom={false}
                                scrollWheelZoom={false}
                                tap={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                />
                                <Marker
                                    position={location.coordinates}
                                >
                                    <Popup>
                                        <address>
                                            <div>{location.addressFirstLine}</div>
                                            <div>{location.addressSecondLine}</div>
                                        </address>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuresSection gunMetalBackground py-5">
                <div className="container">
                    <h3 className='text-center'>Location Features</h3>
                    <p className="text-center fst-italic">Unique features and amenities for this location include the following:</p>
                    <ul>
                        {
                            location.features &&
                            location.features.map((feature, index) => (
                                <li key={index}>
                                    <h5 className="fw-bold mb-2">{feature}</h5>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="unitInfoSection themeBackground py-5">
                <div className="container">
                    <h3 className='text-center'>Unit Summary</h3>
                    <p className="text-center fst-italic">A summary of the types of units available at this location:</p>
                    <div className="unitSummaryTableWrapper py-4 table-responsive bg-sm-light">
                        <table className="unitSummaryTable table">
                            <thead>
                                <tr>
                                    {unitSummaryColumns.includes('unitName') && <th>Name</th>}
                                    {unitSummaryColumns.includes('numberOfUnitsByType') && <th># Units At Site</th>}
                                    {unitSummaryColumns.includes('monthlyRent') && <th>Rent (monthly)</th>}
                                    {unitSummaryColumns.includes('width') && <th>Width</th>}
                                    {unitSummaryColumns.includes('depth') && <th>Depth</th>}
                                    {unitSummaryColumns.includes('squareFeet') && <th>Square Feet</th>}
                                    {unitSummaryColumns.includes('height') && <th>Ceiling Height</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    location.unitSummary &&
                                    location.unitSummary.map((unit, index) => (
                                        <tr key={index}>
                                            {
                                                unitSummaryColumns.map((key, index) => {
                                                    return (
                                                        <td key={index}>
                                                            {getValueForCell(unit, key)}
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <h3 className='text-center'>Unit Availabilities</h3>
                    <p className="text-center fst-italic">A listing of what units are currently available at this time:</p>
                    <div className="availableUnitsTableWrapper py-4 table-responsive bg-sm-light">
                        {
                            location.units && location.units.filter(unit => unit.available).length > 0
                            ?
                            <table className='availableUnitsTable table'>
                                <thead>
                                    <tr>
                                        {unitColumns.includes('unitName') && <th>Name</th> }
                                        {unitColumns.includes('monthlyRent') && <th>Rent (monthly)</th> }
                                        {unitColumns.includes('width') && <th>Width</th> }
                                        {unitColumns.includes('depth') && <th>Depth</th> }
                                        {unitColumns.includes('squareFeet') && <th>Square Feet</th> }
                                        {unitColumns.includes('height') && <th>Ceiling Height</th> }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        location.units.filter(unit => unit.available).map((unit, index) => (
                                            <tr key={index}>
                                                {
                                                    unitColumns.map((key, index) => {
                                                        return (
                                                            <td key={index}>
                                                                {getValueForCell(unit, key)}
                                                            </td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <span className="fw-bold">No available units at this time. Please contact us to be placed on waitlist.</span>
                        }
                    </div>
                </div>
            </div>
            {
                location.extras && 
                location.extras.length > 0 && <div className="extrasSection themeBackground pb-5">
                    <div className="container">
                        <h3 className="text-center">Extras</h3>
                        <p className="text-center fst-italic">Additional options and charges available at this location.</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Recurring</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    location.extras.map((extra, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>${extra.price.toFixed(2)}</td>
                                                <td>{extra.frequency}</td>
                                                <td>{extra.details}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {(location.detailPageImages && location.detailPageImages.length > 0) && <div className="gallerySection py-5">
                <div className="container">
                    <h3 className='text-center'>Location Images</h3>
                    <Carousel
                        className='Carousel'
                        images={location.detailPageImages}
                        hasMediaButton={false}
                        hasSizeButton='bottomRight'
                        hasIndexBoard={false}
                        hasCaptions='top'
                        hasDotButtons='bottom'
                        shouldSwipeOnMouse={false}
                        objectFit='contain'
                    />
                </div>
            </div>}
            {location.enablePayments && <div className={`paymentPopup position-fixed ${popupState}`}>
                <div 
                    className="popupHeader"
                    onClick={() => setPopupState(popupState === 'collapsed' ? 'expanded' : 'collapsed')}
                >
                    <h5 className='text-center'>Need To Pay Rent?</h5>
                    <i className="chevronIcon fas fa-chevron-up position-absolute"></i>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center py-3">
                        <button
                            className="btn btn-primary"
                            onClick={toggleModal}
                        >Make Payment</button>
                    </div>
                </div>
            </div>}
            <Modal
                isOpen={showModal}
                toggle={toggleModal}
                className='paymentModal'
                centered={true}
                size='lg'
            >
                <ModalHeader toggle={toggleModal}>
                    Payment To {location.name}
                </ModalHeader>
                <ModalBody>
                    {paymentApproved && <Alert color='success'>Thank you for your payment!</Alert>}
                    <div className="paymentAmountSection p-4">
                        <label className='form-label h5' htmlFor="amount">Total Rent:</label>
                        <input
                            className='form-control'
                            type="number"
                            step='0.01'
                            value={paymentAmount}
                            onChange={event => setPaymentAmount(event.target.value)}
                        />
                        {paymentAmount && <div className="paymentSummary mt-4">
                            <label className='form-label h5'>Payment Summary</label>
                            <table>
                                <tr>
                                    <td className='fw-bold pe-5'>Rent</td>
                                    <td className='float-end'>${parseFloat(paymentAmount).toFixed(2)}</td>
                                </tr>
                                <tr className='border-bottom'>
                                    <td className='fw-bold pe-5'>Fees</td>
                                    <td className='float-end'>${calculateFees()}</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold pe-5'>Total</td>
                                    <td className='float-end'>${calculateTotal()}</td>
                                </tr>
                            </table>
                        </div>}
                    </div>
                    <Payment
                        amount={calculateTotal()}
                        description={`Payment for ${location.name}`}
                        email={location.paypalEmail}
                        onApprove={() => {setPaymentApproved(true); setPaymentAmount();}}
                    />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default LocationDetail;