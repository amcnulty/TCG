import { useEffect, useState } from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import './home.sass';

function Home(props) {
    const [currentIndex, setCurrentIndex] = useState(2);
    useEffect(() => {
        setCurrentIndex(0);
    }, []);
    const images = [{
        src: 'https://www.wallpaperup.com/uploads/wallpapers/2014/01/14/227588/b335ae1101584f0b84a078b8ab947402.jpg'
    }, {
        src: 'https://i.pinimg.com/originals/6c/db/4b/6cdb4bfe644c483c97ba978b979c6a14.jpg'
    }, {
        src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
    }]
    return (
        <div className='Home'>
            <Carousel
                className='Carousel'
                images={images}
                index={currentIndex}
                isAutoPlaying={true}
                hasMediaButton={false}
                hasSizeButton={false}
                hasIndexBoard={false}
                hasThumbnails={false}
                hasDotButtons={'bottom'}
                shouldSwipeOnMouse={false}
                hasTransition={false}
            />
        </div>
    );
}

export default Home;