import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

function FeaturedCarousel() {
  return (
    <div style={{}}>
      <div
        id="carouselExampleCaptions"
        className="carousel slide h-75 bg-dark rounded-4"
        data-bs-ride="false"
        stle={{
          overflow: 'hidden',
        }}
      >
        <div className="" style={{}}>
          <button
            className="carousel-control-prev px-2"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next px-2"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="carousel-indicators ps-4 pb-4">
          <p
            className="m-0 p-0"
            style={{
              color: '#DFFC21',
            }}
          >
            FEATURED BOOKS
          </p>
          <div
            className="d-flex"
            // className="d-flex position-absolute start-50 translate-middle-x"
          >
            {/* <button
              className="carousel-control-prev px-2"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
  
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span className="visually-hidden">Previous</span>
            </button> */}
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            >
              1
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            >
              2
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            >
              3
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            >
              4
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            >
              5
            </button>
            {/* <button
              className="carousel-control-next px-2"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>

              <span className="visually-hidden">Next</span>
            </button> */}
          </div>
        </div>
        <div className="carousel-inner rounded-4">
          <div className="carousel-item active">
            <div className="d-flex h-100 flex-row-reverse align-items-center">
              <img
                src="https://cdn.sanity.io/images/vgvol637/production/c372ae0433833f5ae1bcc3d851a91e21819324de-1432x1928.png"
                className="d-block w-50 h-100 bg-dark"
                alt="..."
                style={{
                  objectFit: 'contain',
                  padding: '7%',
                }}
              />
              <div className="carousel-caption d-none d-md-block w-50 h-100 bg-dark position-static right-0 left-0 text-start pt-4 ps-4">
                <h3 className="display-2">Subcultural Karate Turtles</h3>
                <h3>Adam Green</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex h-100 flex-row-reverse align-items-center">
              <img
                src="https://cdn.sanity.io/images/vgvol637/production/5fda45194719b5b536f9dc2e64f0f966d41e4f49-1557x2401.png"
                className="d-block w-50 h-100 bg-dark"
                alt="..."
                style={{
                  objectFit: 'contain',
                  padding: '7%',
                }}
              />
              <div className="carousel-caption d-none d-md-block w-50 h-100 bg-dark position-static right-0 left-0 text-start pt-4 ps-4">
                <h3 className="display-2">
                  A Madman Dreams of Turing Machines
                </h3>
                <h3>Janna Levin</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex h-100 flex-row-reverse align-items-center">
              <img
                src="https://cdn.sanity.io/images/vgvol637/production/f389ffccda2b0594913e9e95526eb631584fba87-768x1094.png"
                className="d-block w-50 h-100 bg-dark"
                alt="..."
                style={{
                  objectFit: 'contain',
                  padding: '7%',
                }}
              />
              <div className="carousel-caption d-none d-md-block w-50 h-100 bg-dark position-static right-0 left-0 text-start pt-4 ps-4">
                <h3 className="display-2">
                  CHARAS: The Improbable Dome Builders
                </h3>
                <h3>Syeus Mottel</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex h-100 flex-row-reverse align-items-center">
              <img
                src="https://cdn.sanity.io/images/vgvol637/production/81890e6529c6a12675f66052efc2a7a9f0ab1200-730x1113.png"
                className="d-block w-50 h-100 bg-dark"
                alt="..."
                style={{
                  objectFit: 'contain',
                  padding: '7%',
                }}
              />
              <div className="carousel-caption d-none d-md-block w-50 h-100 bg-dark position-static right-0 left-0 text-start pt-4 ps-4">
                <h3 className="display-2">An Orange</h3>
                <h3>Ted Dodson</h3>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex h-100 flex-row-reverse align-items-center">
              <img
                src="https://cdn.sanity.io/images/vgvol637/production/7a2347b7808fc310ba8663206a2e536d742aa1dd-1417x2480.png"
                className="d-block w-50 h-100 bg-dark"
                alt="..."
                style={{
                  objectFit: 'contain',
                  padding: '7%',
                }}
              />
              <div className="carousel-caption d-none d-md-block w-50 h-100 bg-dark position-static right-0 left-0 text-start pt-4 ps-4">
                <h3 className="display-2">Building Better Realities</h3>
                <h3>Software for Artists</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Carousel
        className="text-light"
        style={{
          backgroundColor: 'black',
          height: '600px',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Carousel.Item
          className="text-light d-inline-flex flex-row justify-content-start align-items-stretch flex-nowrap"
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
            <p className="text-light">Featured Books</p>
            <h3 className="display-2 text-light">Subcultural Karate Turtles</h3>
            <h3 className="text-light">Adam Green</h3>
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
      </Carousel> */}
    </div>
  );
}

export default FeaturedCarousel;
