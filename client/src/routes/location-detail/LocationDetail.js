const LocationDetail = (props) => {
    console.log('slug :>> ', props.match.params.slug);
    return (
        <div>
            location detail page works!            
        </div>
    );
};

export default LocationDetail;