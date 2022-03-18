import React from 'react';
import {Form, Button, Badge} from 'react-bootstrap';
import { FiEdit3 } from 'react-icons/fi';
import axios from 'axios';
import withRouter from "./withRouter";
import {IoArrowBackCircleOutline} from 'react-icons/io5';
import './App.css';

class Editseans extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            seansId: '',
            seansdata: '',
            seanshour: '',
            seansfilm:{
                id: '',
                filmname: '',
                filmtime: '',
            },
            seanssala: '',
            seansliczbasprzedanychbiletow: '',
            seansliczbadostepnychbiletow: '',
            seansnumeryzajetychmiejsc: '',
            errors:{
              seansdata: false,
              seanshour: false,
              seansfilm: false,
              seanssala: false,
            },

            sala:{
                nr_sali: '',
                pojemnosc: '',
            },
        };
      }

      messages = {
        seansdata_incorrect: 'Niewlasciwa data lub godzina filmu! (Puste pole) lub (Podana data i godzina jest z przeszłości)!',
        seanshour_incorrect: 'Niewlasciwa data lub godzina filmu! (Puste pole) lub (Podana data i godzina jest z przeszłości)!',
        seanssala_incorrect: 'Nie ma takiej sali. Do dyspozycji sale: numeru 1 do numeru 5',
      }


  componentDidMount(){
    this.getSeansFilmByID();
  }


  getSalaByID(salaid){
    if (salaid !== ''){

    axios.get(`http://localhost:7777/sale/${salaid}`)
    .then(response =>{
         this.setState({
           seanssala:
           {
            nr_sali: response.data.nr_sali,
            pojemnosc: response.data.pojemnosc
           },
           seansnumeryzajetychmiejsc:[],
           seansliczbasprzedanychbiletow:0

           }, () => {

            var liczba_miejsc = this.state.seanssala.pojemnosc;
    
            for (var i = 1; i <= liczba_miejsc; i++) {
              let id = i;
              this.state.seansnumeryzajetychmiejsc.push({"id_miejsca": id, "zajete":false});
            }

          });
     })
     .catch(err => console.log(err));
  }
}





  getSeansFilmByID(){
    let seansid = this.props.params.id;

    axios.get(`http://localhost:7777/seanse/${seansid}`)
    .then(response =>{
         this.setState({
           seansId: this.props.params.id,
           seansdata: response.data.seansdata,
           seanshour: response.data.seanshour,
           seansfilm: response.data.seansfilm,
           seanssala: response.data.seanssala,
           seansliczbasprzedanychbiletow: response.data.seansliczbasprzedanychbiletow,
           seansliczbadostepnychbiletow: response.data.seansliczbadostepnychbiletow,
           seansnumeryzajetychmiejsc: response.data.seansnumeryzajetychmiejsc,
         }, () => {
           console.log(this.state);
         });
    })
    .catch(err => console.log(err));
 }


 editSeans(newSeans){
    axios.request({
      method: 'put',
      url:`http://localhost:7777/seanse/${this.state.seansId}`,
      data: newSeans
    }).then(response => {
      this.props.navigate("/seanse");
    }).catch(err => console.log(err));
  }


  fromValidation = () => {
  let seansdata = false;
  let seanshour = false;
  let seanssala = false;

  let correct = false;


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  var date1=new Date(this.state.seansdata+" " + this.state.seanshour + ":00");

  let datenow = new Date();

  function generateDatabaseDateTime(date) {
  return date.toISOString().replace("T"," ").substring(0, 19);
  }

  datenow = generateDatabaseDateTime(datenow);

  datenow = new Date(datenow);
  datenow.setHours( datenow.getHours() + 1 );

  var seansdataa = new Date(date1);


  if(this.state.seansdata !== '' && this.state.seanshour !== '' && (datenow <= seansdataa)){
    
    seansdata = true;
    seanshour = true;

  }

  if((this.state.seanssala > 0 && this.state.seanssala <=5)  || (this.state.sala.nr_sali === '' && this.state.sala.pojemnosc === '')){
    
    seanssala = true;
 
   }

  if(seansdata && seanshour && seanssala ){
    correct = true;
  }
  return({
    seansdata,
    seanshour,
    seanssala,
    correct
  })
}


handleSubmit = (e) =>{
  e.preventDefault()
  const validation = this.fromValidation()
  if(validation.correct){
    this.setState({
      seansdata: '',
      seanshour: '',
      seanssala: '',


     errors:
     {
        seansdata: false,
        seanshour: false,
        seanssala: false
     }
  })



  const Seans = ({seansId: this.state.seansId ,seansdata: this.state.seansdata, seanshour: this.state.seanshour, seansfilm: this.state.seansfilm, seanssala:this.state.seanssala, seansliczbasprzedanychbiletow: this.state.seansliczbasprzedanychbiletow, seansliczbadostepnychbiletow: this.state.seanssala.pojemnosc - this.state.seansliczbasprzedanychbiletow, seansnumeryzajetychmiejsc: this.state.seansnumeryzajetychmiejsc})
  this.editSeans(Seans);

  }else{
    this.setState({
      errors:{
        seansdata: !validation.seansdata,
        seanshour: !validation.seanshour,
        seanssala: !validation.seanssala
        },
    })
          
  }
}

handleChange = (e) =>{     
  const name = e.target.name;
  const type = e.target.type;
  if(type === "text" || type === "number" || type ==="date" || type==="time"  ){
    const value = e.target.value;
    this.setState({
      [name]: value
    })
    if (name === "seanssala"){
        this.getSalaByID(value);
        }
    }
  } 

render(){
    
    return(
        <div>
         
         <br/>
             <Button onClick={() => {this.props.navigate("/seanse") }} variant="secondary"><IoArrowBackCircleOutline size = {25}/> Wróć</Button>
             <h1 style = {{textAlign: "center"}}>
             <Badge bg="secondary">Edycja seansu (id={this.props.params.id})</Badge>
             </h1>


        <Form style = {{textAlign: "center"}} onSubmit={this.handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="seansdata">
          <Form.Label>Data filmu: 
          <Form.Control type="date" placeholder="" name="seansdata" value={this.state.seansdata} onChange={this.handleChange} />
          {this.state.errors.seansdata && <span>{this.messages.seansdata_incorrect}</span>}
          </Form.Label>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="seanshour">
          <Form.Label>Godzina: 
          <Form.Control type="time" placeholder=""  name="seanshour" value={this.state.seanshour} onChange={this.handleChange} />
          {this.state.errors.seanshour && <span>{this.messages.seanshour_incorrect}</span>}
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="seansfilmname">
        <Form.Label>Tytuł filmu: 
        <Form.Control name="seanstytul" placeholder={this.state.seansfilm.filmname} disabled/>
        </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="seanssala">
          <Form.Label>Sala ( Wpisz numer sali (nr.1 - nr.5) ): 
          <Form.Control type="text" placeholder="" name="seanssala" value={this.state.seanssala.nr_sali} onChange={this.handleChange} />
          {this.state.errors.seanssala && <span>{this.messages.seanssala_incorrect}</span>}
          </Form.Label>
        </Form.Group>
        <Button type = "submit" variant="primary" size="sm">Zatwierdź edytowanie <FiEdit3 size = {20}/></Button>
      
      </Form>
      </div>
        )
}


}
export default withRouter(Editseans);