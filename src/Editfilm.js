import React, {Component} from "react";
import { Badge, Button, Form} from "react-bootstrap";
import withRouter from "./withRouter";
import { FiEdit3 } from 'react-icons/fi';
import {IoArrowBackCircleOutline} from 'react-icons/io5';
import axios from 'axios';


class Editfilm extends Component{

  constructor(props){

  super(props);

  this.state = {
      id: '',
      filmname: '',
      filmtime: '',
      filmposter: '',
  
      errors:{
        filmname: false,
        filmtime: false,
        filmposter: false,
      },
      show: false
    }
  }


  handleClose = () =>(
     this.setState({
       show: false
     })
  )

  handleShow = () =>(
    this.setState({
      show: true
    })
 )

    messages = {
      filmname_incorrect: 'Nazwa powinna być dłuższa niż 1 litera i zaczynać się od wielkiej litery.',
      filmtime_incorrect: 'Dlugość filmu powinna być dłuższa niż 30 minut i krótsza niz 300 minut.',
      filmposter_incorrect: 'Zly adres URL plakatu',
    }


    componentDidMount(){
      this.getFilmByID();
    }


    getFilmByID(){
       let filmid = this.props.params.id;

       axios.get(`http://localhost:7777/filmy/${filmid}`)
       .then(response =>{
            this.setState({
              id: response.data.filmId,
              filmname: response.data.tytul,
              filmtime: response.data.czas_trwania,
              filmposter: response.data.plakat_url
            }, () => {
              console.log(this.state);
            });
       })
       .catch(err => console.log(err));
    }


    editFilm(newFilm){
      axios.request({
        method: 'put',
        url:`http://localhost:7777/filmy/${this.state.id}`,
        data: newFilm
      }).then(response => {
        this.props.navigate("/filmy");
      }).catch(err => console.log(err));
    }


      handleChange = (e) =>{
        const name = e.target.name;
        const type = e.target.type;
        if(type === "text" || type === "number" ){
          const value = e.target.value;
          this.setState({
            [name]: value
          })
        } 
        
      }
      handleSubmit = (e) =>{
          e.preventDefault()
          const validation = this.fromValidation()
          if(validation.correct){
            this.setState({
              filmname: '',
              filmtime: '',
              filmposter: '',

  
        errors:{
            filmname: false,
            filmtime: false,
            filmposter: false,
            }
          })


        const Film = ({filmId: this.state.id, tytul: this.state.filmname, czas_trwania: this.state.filmtime, plakat_url: this.state.filmposter});
        this.editFilm(Film);
        
          }else{
            this.setState({
              errors:{
                filmname: !validation.filmname,
                filmtime: !validation.filmtime,
                filmposter: !validation.filmposter,
                }
            })
          }
      }
      fromValidation = () => {
        let filmname = false;
        let filmtime = false;
        let correct = false;
        let filmposter = false;
        let filmnameToCheck = this.state.filmname; 
        let regex = /^[A-Z]/;
        let regex2 = /^[0-9]/;
        let result = filmnameToCheck.match(regex);
        let result2 = filmnameToCheck.match(regex2);
        if(this.state.filmname.length > 1 && (result !== null || result2 !== null)  ){
          
          filmname = true;

        }
        if(this.state.filmtime > 30 && this.state.filmtime < 300 ){
          filmtime = true;
        }
        if(this.state.filmposter.length > 5){
          filmposter = true;
        }
        if(filmname && filmtime && filmposter){
          correct = true;
        }
        return({
          correct,
          filmname,
          filmposter,
          filmtime,
        })
      }


      wrapperFunction = (event) => {
        this.handleChange();
        this.handleSubmit(event);
      }
        
      render(){
        return(
            <div>

             <br/>
             <Button onClick={() => {this.props.navigate("/filmy") }} variant="secondary"><IoArrowBackCircleOutline size = {25}/> Wróć</Button>
             <h1 style = {{textAlign: "center"}}>
             <Badge bg="secondary">Edycja Filmu (id={this.props.params.id})</Badge>
             </h1>

               
          <Form style = {{textAlign: "center"}} onSubmit = {this.handleSubmit} noValidate>
  <Form.Group className="mb-3" controlId="formTitle">
    <Form.Label>Nazwa filmu: 
    <Form.Control type="text" placeholder="" name="filmname" value={this.state.filmname} onChange={this.handleChange} />
    {this.state.errors.filmname && <span>{this.messages.filmname_incorrect}</span>}
    </Form.Label>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formTime">
    <Form.Label>Czas trwania: 
    <Form.Control type="number" placeholder=""  name="filmtime" value={this.state.filmtime} onChange={this.handleChange} />
    {this.state.errors.filmtime && <span>{this.messages.filmtime_incorrect}</span>}
    </Form.Label>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formPoster">
    <Form.Label>Adres URL plakatu: 
    <Form.Control type="text" placeholder="" name="filmposter" value={this.state.filmposter} onChange={this.handleChange} />
    {this.state.errors.filmposter && <span>{this.messages.filmposter_incorrect}</span>}
    </Form.Label>
  </Form.Group>
  <Button type = "submit" variant="primary" > Zatwierdź edytowanie <FiEdit3 size = {20}/> </Button>
  </Form>
  </div>
        )
      }
}

export default withRouter(Editfilm);

