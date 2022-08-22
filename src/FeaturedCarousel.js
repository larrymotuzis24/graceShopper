import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

function FeaturedCarousel() {
  return (
    <div style={{}}>
      <Carousel
        className=""
        style={{
          backgroundColor: 'black',
          height: '600px',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Carousel.Item
          className="d-inline-flex flex-row justify-content-start align-items-stretch flex-nowrap"
          style={{
            padding: '0',
            margin: '0',
            width: '100%',
          }}
        >
          <Carousel.Caption
            className="text-start d-inline-block position-static align-self-stretch"
            style={{
              width: '50%',
              padding: '2rem',
            }}
          >
            <p>Featured Books</p>
            <h5 className="display-5">Subcultural Karate Turtles</h5>
            <h5 className="display-5">Adam Green</h5>
          </Carousel.Caption>

          <img
            className=""
            style={{
              height: '600px',
              width: '50%',
              objectFit: 'contain',
              padding: '4rem',
              display: 'inline-block',
            }}
            src="https://cdn.sanity.io/images/vgvol637/production/c372ae0433833f5ae1bcc3d851a91e21819324de-1432x1928.png"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item
          className="d-inline-flex flex-row justify-content-start align-items-stretch flex-nowrap"
          style={{
            padding: '0',
            margin: '0',
            width: '100%',
          }}
        >
          <Carousel.Caption
            className="text-start d-inline-block position-static align-self-stretch"
            style={{
              width: '50%',
              padding: '2rem',
            }}
          >
            <p>Featured Books</p>
            <h5 className="display-5">The Wandering Lake</h5>
            <h5 className="display-5">Patty Chang</h5>
          </Carousel.Caption>

          <img
            className=""
            style={{
              height: '600px',
              width: '50%',
              objectFit: 'contain',
              padding: '4rem',
              display: 'inline-block',
            }}
            src="https://cdn.sanity.io/images/vgvol637/production/2339ac55d39ca7f5b05faa8f395bb10b1824f7c8-683x1000.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item
          className="d-inline-flex flex-row justify-content-start align-items-stretch flex-nowrap"
          style={{
            padding: '0',
            margin: '0',
            width: '100%',
          }}
        >
          <Carousel.Caption
            className="text-start d-inline-block position-static align-self-stretch"
            style={{
              width: '50%',
              padding: '2rem',
            }}
          >
            <p>Featured Books</p>
            <h5 className="display-5">Architectures of Violence</h5>
            <h5 className="display-5">Caroline Sinders</h5>
          </Carousel.Caption>

          <img
            className=""
            style={{
              height: '600px',
              width: '50%',
              objectFit: 'contain',
              padding: '4rem',
              display: 'inline-block',
            }}
            src="https://cdn.sanity.io/images/vgvol637/production/b86f058f83d232ac6837c7b2744f3f023420860d-750x1083.jpg"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default FeaturedCarousel;
