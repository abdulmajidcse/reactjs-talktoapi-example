import { Carousel } from "react-bootstrap";
import laravel from '../assets/images/laravel.png';
import lumen from '../assets/images/lumen.png';
import reactjs from '../assets/images/reactjs.png';
import sliderImage from '../assets/css/slider-image.module.css';

export default function Slider() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                className={`d-block w-100 ${sliderImage.sliderImage}`}
                src={laravel}
                alt="Laravel"
                />
                <Carousel.Caption>
                <h3>Laravel Framework</h3>
                <p>Laravel is a most popular PHP Framework</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className={`d-block w-100 ${sliderImage.sliderImage}`}
                src={lumen}
                alt="Lumen"
                />

                <Carousel.Caption>
                <h3>Lumen API</h3>
                <p>Lumen is a micro-framework to build API.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className={`d-block w-100 ${sliderImage.sliderImage}`}
                src={reactjs}
                alt="ReactJS"
                />

                <Carousel.Caption>
                <h3>ReactJS</h3>
                <p>ReactJS is JavaScript frontend library.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}