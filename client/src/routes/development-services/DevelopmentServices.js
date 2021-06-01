import CompanyLogo from "../../components/companyLogo/CompanyLogo";
import './developmentServices.sass';

function DevelopmentServices(props) {
    return (
        <div className='DevelopmentServices'>
            <div className="landingSection py-5">
                <div className="container">
                    <h1 className='fw-light text-uppercase'>LIST WITH US</h1>
                    <CompanyLogo textOnly/>
                </div>
            </div>
            <div className="contentSection py-5">
                <div className="container">
                    <h3>Subscribe to <span className='fst-italic'>contractorsgarage.com</span></h3>
                    <div className="ms-4">
                        <p>Do you have a Contractors Garage of your own and would like to partner with us?</p>
                        <p>Annual subscriptions under <a className='text-decoration-none' href='http://www.contractorsgarage.com' target="_blank">contractorsgarage.com</a> website include:</p>
                        <ul>
                            <li>Your own page under <span className='fst-italic'>contractorsgarage.com</span> for <span className='fw-bold'>each</span> location</li>
                            <li><span className='fw-bold'>Lead generation</span> with your direct contact info</li>
                            <li>User’s ability to self-update availability and rates</li>
                            <li>Images of your property, and its features and benefits</li>
                            <li>Link to payments (via <span className='fst-italic'>PayPal</span>) so your tenants can pay rent via credit card (optional)</li>
                            <li>Organic search engine optimization.  Adword/keyword lead generation at expense of Subscriber</li>
                        </ul>
                    </div>
                    <h4>Payment</h4>
                    <div className="ms-4">
                        <p>Payment in a graduated structure as follows:</p>
                        <ul className='my-4'>
                            <li><span className='fw-bold'>Property #1:</span>  $2500 per year</li>
                            <li><span className='fw-bold'>Property #2:</span>  $1,000 additional per year ($3500 total)</li>
                            <li><span className='fw-bold'>Property #3+:</span>  $500 additional per year per additional property added</li>
                        </ul>
                        <table className='table my-4'>
                            <thead>
                                <th>Number Of Properties</th>
                                <th>Cost Per Year</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>$2500 per year</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>$1,000 additional per year ($3500 total)</td>
                                </tr>
                                <tr>
                                    <td>3+</td>
                                    <td>$500 additional per year per additional property added</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className='my-4'><span className='fw-bold'>5 year minimum term</span> with automatic year-to-year renewal.</p>
                    </div>
                    <div className="noteBox p-4 themeBackground">
                        <p className='mb-0'><span className='fw-bold'>Note:</span> <span className='fst-italic'>This is a subscription to a listing service.  You are not obtaining licensing rights to Contractors Garage nor joining a franchise.</span></p>
                    </div>
                    <div className="insightBox p-5 mt-5 bg-white">
                        <p>Interested in building your own Contractors Garage or similar commercial real estate investment?  Visit <a className='text-decoration-none' href='https://www.insightcommercial.net/construction.html' target='_blank'>insightcommercial.net/construction</a> to learn more about our development consulting services.</p>
                        <a href='http://www.insightcommercial.net/construction.html' className="btn btn-primary" target='_blank'>
                            Visit Insight Commercial&nbsp;&nbsp;
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DevelopmentServices;