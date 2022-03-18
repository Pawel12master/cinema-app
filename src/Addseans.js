import React from 'react';
import './App.css';
import {Button, Form} from 'react-bootstrap';
import { GrFormAdd } from 'react-icons/gr';
import PropTypes from "prop-types";
import withRouter from "./withRouter";
import axios from 'axios';



class Addseans extends React.Component{

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

            seanse:[
            ],
            sala:{
                nr_sali: '',
                pojemnosc: '',
            },

          time: this.getTime(),
        };
      }
      messages = {
        seansdata_incorrect: 'Niewlasciwa data lub godzina filmu! (Puste pole) lub (Podana data i godzina jest z przeszłości)!',
        seanshour_incorrect: 'Niewlasciwa data lub godzina filmu! (Puste pole) lub (Podana data i godzina jest z przeszłości)!',
        seanssala_incorrect: 'Nie ma takiej sali. Do dyspozycji sale: numeru 1 do numeru 5',
      }

      getTime(){
        const currentTime = new Date();
        return({
          day: currentTime.getDay(),
          month: currentTime.getMonth(),
        })
      }


      componentDidMount(){
        this.getSeansFilmByID();

        fetch('http://localhost:7777/seansee', {
            method:'GET',
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
            .then(response => response.json())
            .then(data => this.setState({seanse: data})); 
      }
  
      getSeansFilmByID(){
         let filmid = this.props.params.id;
  
         axios.get(`http://localhost:7777/filmy/${filmid}`)
         .then(response =>{
              this.setState({
                seansfilm:
                {
                id: response.data.filmId,
                filmname: response.data.tytul,
                filmtime: response.data.czas_trwania
                }
            });
         })
         .catch(err => console.log(err));
      }

      getSalaByID(){
        let salaid = this.state.seanssala;
        console.log(salaid);

        if (salaid !== ''){

        axios.get(`http://localhost:7777/sale/${salaid}`)
        .then(response =>{
             this.setState({
               sala:
               {
                nr_sali: response.data.nr_sali,
                pojemnosc: response.data.pojemnosc
               }
           });
        }).catch(err => console.log(err));
        }
    }


      addSeans = () => {
        var list = this.state.seanse;
        var id = 0;
        list.length === 0 ? id = 1 : id = list[list.length - 1].seansId + 1;

        var numeryzajetychmiejsc = [];
        

        var liczba_miejsc = this.state.sala.pojemnosc;

        for (var i = 1; i <= liczba_miejsc; i++) {
          let id = i;
          numeryzajetychmiejsc.push({"id_miejsca": id, "zajete":false});
        }


        const seans = ({seansId: id, seansdata: this.state.seansdata, seanshour: this.state.seanshour, seansfilm: this.state.seansfilm, seanssala:this.state.sala,
        seansliczbasprzedanychbiletow:0,seansliczbadostepnychbiletow: this.state.sala.pojemnosc, seansnumeryzajetychmiejsc:numeryzajetychmiejsc});
    
        fetch('http://localhost:7777/seans', {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(seans)
        }).then(() => {
            alert("Dodano seans");
            this.props.navigate("/filmy");
        }).catch((error) => {
          console.error(error);
        })
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
        console.log(datenow);

        var seansdataa = new Date(date1);
        console.log(seansdataa);
        // var todaydata = new Date(today);

        if(this.state.seansdata !== '' && this.state.seanshour !== '' && (datenow <= seansdataa)){
          
          seansdata = true;
          seanshour = true;
      
        }
        if(this.state.seanssala > 0 && this.state.seanssala <=5  && this.state.sala.nr_sali !== '' && this.state.sala.pojemnosc !== ''){
    
           seanssala = true;
        
          }
        if(seansdata && seanshour && seanssala){
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

            console.log(this.state.sala)
            this.addSeans();

        }
        else{
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
        if(type === "text" || type === "number" || type ==="date" || type==="time"){
          const value = e.target.value;
          this.setState({
            [name]: value
          })
          if (name === "seanssala"){
              this.getSalaByID();
          }
      }
    }
        
      render(){
        return(
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
              <Form.Control type="text" placeholder="" name="seanssala" value={this.state.seanssala} onChange={this.handleChange} />
              {this.state.errors.seanssala && <span>{this.messages.seanssala_incorrect}</span>}
              </Form.Label>
            </Form.Group>
            <Button type = "submit" variant="success" size="sm" >Dodaj Seans<GrFormAdd size = {25}/></Button> 
    
          </Form>
        )
      }
}



export default withRouter(Addseans);