import { Alert } from "reactstrap";
import CompanyLogo from "../../components/companyLogo/CompanyLogo";
import './developmentServices.sass';

function DevelopmentServices(props) {
    return (
        <div className='DevelopmentServices'>
            <Alert className='text-center' color='primary'>Contractor Garage&trade; will soon be hosting a seminar lead by Kevin Combs. Check out the <a className="text-decoration-none" href="https://www.contractorgarage.com/seminar" target="_blank" rel="noopener noreferrer">seminar information page</a> for more details.</Alert>
            <div className="landingSection py-5">
                <div className="container">
                    <h1 className='fw-light text-uppercase'>BRAND WITH US</h1>
                    <CompanyLogo textOnly/>
                </div>
            </div>
            <div className="contentSection py-5">
                <div className="container">
                    <h3>Subscribe to <span className='fst-italic'>contractorgarage.com</span></h3>
                    <div className="ms-4">
                        <p>If earning passive income in an unsaturated niche of commercial real estate is of interest to you, join the leading brand in large-bay storage. Subscribers benefit through instant branding and credibility with lenders, municipalities, and investors. We are the feasibility study. You can be confident you will step into a proven concept on day one without the steep learning curve.</p>
                        <p>Subscriptions under <a className='text-decoration-none' href='https://www.contractorgarage.com' target="_blank" rel="noopener noreferrer">contractorgarage.com</a> website include:</p>
                        <ul>
                            <li>Your own page under <span className='fst-italic'>contractorgarage.com</span> for <span className='fw-bold'>each</span> location</li>
                            <li><span className='fw-bold'>Lead generation</span> with your direct contact info</li>
                            <li>User’s ability to self-update availability and rates</li>
                            <li>Images of your property, and its features and benefits</li>
                            <li>Link to payments (via <span className='fst-italic'>PayPal</span>) so your tenants can pay rent via credit card (optional)</li>
                            <li>Organic search engine optimization.  Adword/keyword lead generation at expense of Subscriber</li>
                        </ul>
                    </div>
                    <h4>Payment</h4>
                    <div className="ms-4">
                        <p>We offer two payment options for our branding and services: an annual subscription or a one-time payment.</p>
                        <ul className='my-4'>
                            <li><span className='fw-bold'>Annual Fee:</span>  <strong>$3,000</strong> per year <span className="text-secondary">(Ten year term minimum)</span></li>
                            <li><span className='fw-bold'>One-time Fee:</span>  <strong>$30,000</strong> one-time lifetime fee <span className="text-secondary">(Can be financed or packaged into your construction loan)</span></li>
                        </ul>
                    </div>
                    <div className="noteBox p-4 themeBackground">
                        <p className='mb-0'><span className='fw-bold'>Note:</span> <span className='fst-italic'>This is a subscription to a listing service.  You are not obtaining licensing rights to Contractor Garage&trade; nor joining a franchise.</span></p>
                    </div>
                    <div className="insightBox p-5 mt-5 bg-white">
                        <p>Interested in building your own Contractor Garage&trade; or similar commercial real estate investment?  Visit <a className='text-decoration-none' href='https://www.insightcommercial.net/construction.html' target='_blank' rel="noopener noreferrer">insightcommercial.net/construction</a> to learn more about our development consulting services.</p>
                        <a href='http://www.insightcommercial.net/construction.html' className="btn btn-primary" target='_blank' rel="noopener noreferrer">
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