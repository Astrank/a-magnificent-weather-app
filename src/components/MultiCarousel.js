import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MultiCarousel.css';

const MultiCarousel = (props) => {
  const days = ["sun.", "mon.", "tue.", "wed.", "thu.", "fri.", "sat."];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobilet: {
      breakpoint: { max: 600, min: 0 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  const CustomRightArrow = ({ onClick }) => {
    return <i onClick={() => onClick()} className="fas fa-chevron-right right-arrow"></i>
  };

  const CustomLeftArrow = ({ onClick }) => (
    <i onClick={() => onClick()} className="fas fa-chevron-left left-arrow"></i>
  );

  return(
    <Carousel 
      responsive={responsive}
      className="daily-weather"
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
      showDots={false}
      infinite={false}
      autoPlay={false}>
      {props.data.map((day, index) => (
        <div className="day-weather" key={index}>
          <div className="date">{`${
            days[
              new Date(
                new Date().setDate(new Date().getDate() + index)
              ).getDay()
            ]
          } ${new Date(
            new Date().setDate(new Date().getDate() + index)
          ).getDate()}`}</div>
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
              alt={day.weather[0].main}
              title={day.weather[0].main}
            />
          </div>
          <div className="daily-minmax">
            <div className="max">{Math.round(day.temp.max)}</div>
            <div className="min">{Math.round(day.temp.min)}</div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MultiCarousel;