import React from 'react';
import './App.css';
import {Button, Form} from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import PropTypes from "prop-types";



class Addfilm extends React.Component{

    constructor(props){

      super(props);

    this.state = {
        filmname: '',
        filmtime: '',
        filmposter: '',
    
        errors:{
          filmname: false,
          filmtime: false,
          filmposter: false,
        }
      }
    }

      messages = {
        filmname_incorrect: 'Nazwa powinna być dłuższa niż 1 litera i zaczynać się od wielkiej litery.',
        filmtime_incorrect: 'Dlugość filmu powinna być dłuższa niż 30 minut i krótsza niz 300 minut.',
        filmposter_incorrect: 'Zly adres URL plakatu',
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
          console.log(this.state.filmname);
          const Film = ({filmname: this.state.filmname, filmtime: this.state.filmtime, filmposter: this.state.filmposter})
          const {addFilm} = this.props;
          addFilm(Film);
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
        
      render(){
        return(
          <Form style = {{textAlign: "center"}} onSubmit={this.handleSubmit} noValidate>
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
  <Button type = "submit" variant="success" size="sm" onClick = {this.addFilm}>Dodaj Film<GrFormAdd size = {25}/></Button>
</Form>
        )
      }
}
Addfilm.propTypes={
  addFilm: PropTypes.func
}
export default Addfilm;