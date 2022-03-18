import React from 'react';
import { Carousel } from 'react-bootstrap';

const Home = () => {

    return (
        <div>

<Carousel>
  <Carousel.Item>
    <img height = "400px"
      className="d-block w-100"
      src="https://www.looper.com/img/gallery/why-do-movie-posters-reverse-names/intro-1582575430.jpg"
      alt=""
    />
  </Carousel.Item>
  <Carousel.Item>
    <img height = "400px"
      className="d-block w-100"
      src="https://a-static.besthdwallpaper.com/mroczny-rycerz-powstaje-plakat-filmowy-tapeta-1920x1200-12624_6.jpg"
      alt=""
    />
  </Carousel.Item>
</Carousel>
            <br/>
            <h2>Witamy w kinie!</h2>
            <ul>
            <li>Kupując bilet przez naszą stronę, należy postępować dokładnie z poleceniami pojawiającymi się na stronie.</li>
            <li>Wybranie miejsca na sali nie jest równoznaczne z kupnem biletu. Jeżeli bilet nie zostanie opłacony to transakcja jest anulowana a miejsca automatycznie odblokowywane.</li>
            <li>W przypadku gdy w trakcie dokonywania zakupu, kupujący utraci połączenie z internetem, lub nastąpią inne problemy uniemożliwiające dokonanie płatności, to po 30 minutach transakcja zostanie anulowana, miejsca odblokowane i po tym czasie można dokonać zakupu ponownie.</li>
            </ul>
        </div>
    )
}

export default Home;