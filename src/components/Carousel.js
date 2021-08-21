import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = (props) => {
  const days = ["sun.", "mon.", "tue.", "wed.", "thu.", "fri.", "sat."];
  const settings = {
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return(
    <Slider {...settings} className="daily-weather">
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
    </Slider>
  );
};

export default Carousel;