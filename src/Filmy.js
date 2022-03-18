import React from 'react';
import {Row, Col, Card, Button, Badge} from 'react-bootstrap'
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa" ;
import Addfilm from './Addfilm';
import { Link } from 'react-router-dom';


class Filmy extends React.Component {

constructor(props){
  super(props);

  this.state = {
    filmy: [
    ]
  };

    this.remove = this.remove.bind(this);

}

  async remove(id){
    await fetch(`http://localhost:7777/filmy/${id}`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(() => {
        let updatedFilmy = [...this.state.filmy].filter(i => i.filmId !== id);
        this.setState({filmy: updatedFilmy});
        alert("Usunięto film");
    })
}

  
  componentDidMount() {
    fetch('http://localhost:7777/filmy', {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }})
        .then(response => response.json())
        .then(data => this.setState({filmy: data}));
}

  addFilm = (Film) =>{
    var list = this.state.filmy;
    var id = 0;
    list.length === 0 ? id = 1 : id = list[list.length - 1].filmId + 1;


    const film = ({filmId: id, tytul: Film.filmname, czas_trwania: Film.filmtime, plakat_url: Film.filmposter});

    fetch('http://localhost:7777/filmy', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(film)
    }).then(() => {
        alert("Dodano film");
        this.componentDidMount()
    }).catch((error) => {
      console.error(error);
    })
}

   render() {
    return(
      <div style={{margin:"20px"}}>
            <h1 style = {{textAlign: "center"}}>
            <Badge bg="secondary">Dodaj Film</Badge>
            </h1>
        <Addfilm addFilm = {this.addFilm} />
        <br/>

      <Row xs={1} md={4} className="g-3">
        {Array.from(this.state.filmy).map((Film, idx) => (
      <Col>
          <Card  style = {{backgroundColor: "#B5B4B0" }}>
            <Card.Img variant="top" style = {{width: "301px", height: "430px"}} src={Film.plakat_url} />
              <Card.Body>
                  <Card.Title style = {{fontSize: "17px"}}>{Film.tytul}</Card.Title>
                <Card.Text>
                  <b>Czas trwania: </b> {Film.czas_trwania} minut
                </Card.Text>
              </Card.Body>
            <Card.Footer className="text-muted"><Button href = {`/filmy/dodajseans/${Film.filmId}`} variant="primary" size="sm">Dodaj seans</Button>
            <Link to={`/filmy/edytuj/${Film.filmId}`}><FaEdit size= {35} style= {{float:"right" ,cursor: 'pointer', color:"#212529"}}/></Link>
            <AiFillDelete onClick={() => this.remove(Film.filmId)} size={35} style = {{float:"right" ,cursor: 'pointer', color:"#212529"}}/>             
            </Card.Footer>
        </Card>
      </Col>
      ))}
      </Row>
      </div>

    )
   }
}

export default Filmy;