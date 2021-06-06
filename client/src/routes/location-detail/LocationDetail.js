import { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import './locationDetail.sass';
import { API } from '../../util/API';

const LocationDetail = (props) => {
    const [location, setLocation] = useState();
    const [activeTab, setActiveTab] = useState('1');
    const [popupState, setPopupState] = useState('collapsed');

    const UNIT_COLUMNS = ['unitName', 'monthlyRent', 'width', 'height', 'depth', 'squareFeet'];

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        API.getLocationBySlug(props.match.params.slug)
        .then(setLocation)
        .catch(Function.prototype);
    }, []);

    const getValueForCell = (unit, key) => {
        if (!unit[key]) return '-';
        switch (key) {
            case UNIT_COLUMNS[1]:
                return `$${unit[key].toFixed(2)}`;
            case UNIT_COLUMNS[2]:
            case UNIT_COLUMNS[3]:
            case UNIT_COLUMNS[4]:
                        
                return `${unit[key]} ft`;
            case UNIT_COLUMNS[5]:
                return `${unit[key]} sqft`;
            default:
                return unit[key];
        }
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
            <div className="landingSection py-5">
                <div className="container">
                    <h1 className='mb-5 fw-light'>{location.name}</h1>
                    <p>{location.longDescription}</p>
                </div>
            </div>
            <div className="featuresSection gunMetalBackground py-5">
                <div className="container">
                    <h3 className='text-center'>Location Features</h3>
                    <p className="text-center fst-italic">Unique features and amenities for this location include the following:</p>
                    <ul>
                        {location.features.map((feature, index) => (
                            <li key={index}>
                                <h5 className="fw-bold mb-2">{feature}</h5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="unitInfoSection themeBackground py-5">
                <div className="container">
                    <h3 className='text-center'>Unit Information</h3>
                    <p className="text-center fst-italic">Availability, pricing, and sizing information for the units at this locations are as follows:</p>
                    <Nav tabs className='border-0'>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                                >
                                UNIT SUMMARY
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                AVAILABLE UNITS
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <div className="py-4">
                                asdf
                            </div>
                        </TabPane>
                        <TabPane tabId='2'>
                            <div className="availableUnitsTableWrapper py-4 table-responsive bg-sm-light">
                                <table className='availableUnitsTable table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Rent (monthly)</th>
                                            <th>Width</th>
                                            <th>Height</th>
                                            <th>Depth</th>
                                            <th>Square Feet</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            location.units.filter(unit => unit.available).map((unit, index) => (
                                                <tr key={index}>
                                                    {
                                                        UNIT_COLUMNS.map((key, index) => {
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
                        </TabPane>
                    </TabContent>
                </div>
            </div>
            <div className="gallerySection py-5">
                <div className="container">
                    <h3 className='text-center'>Location Images</h3>

                </div>
            </div>
            <div className={`paymentPopup position-fixed ${popupState}`}>
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
                            onClick={() => {}}
                        >Make Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetail;