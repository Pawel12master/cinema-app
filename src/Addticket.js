import React from 'react';
import './App.css';
import {Button, Form, Badge} from 'react-bootstrap';
import { FiShoppingCart} from 'react-icons/fi';
import withRouter from "./withRouter";
import axios from 'axios';
import {IoArrowBackCircleOutline} from 'react-icons/io5';



class Addticket extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            nr_miejsca: '',
            seans:'',
            nazwa_filmu:'',
            liczba_miejsc_na_sali: '',
            tablica_miejsc:'',
            errors:{
              nr_miejsca: false,
            },
            bilety:[]

        };
        this.inputRef= React.createRef()
      }
      
      messages = {
        nr_miejsca_incorrect: 'Podane miejsce jest już zajęte!',
      }


      componentDidMount(){
        this.getSeansFilmByID();

        fetch('http://localhost:7777/bilety', {
            method:'GET',
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
            .then(response => response.json())
            .then(data => this.setState({bilety: data})); 
      }
  
      getSeansFilmByID(){
        let seansid = this.props.params.id;
    
        axios.get(`http://localhost:7777/seanse/${seansid}`)
        .then(response =>{
             this.setState({
               seans: response.data,
               nazwa_filmu: response.data.seansfilm.filmname,
               liczba_miejsc_na_sali: response.data.seanssala.pojemnosc,
               tablica_miejsc: response.data.seansnumeryzajetychmiejsc
             }, () => {
             });
        })
        .catch(err => console.log(err));
     }

      addBilet = () => {
        var list = this.state.bilety;
        var id = 0;
        list.length === 0 ? id = 1 : id = list[list.length - 1].biletId + 1;

        var editseans = this.state.seans


        for (let i = 0; i < this.state.liczba_miejsc_na_sali; i++) {
            if (this.state.nr_miejsca == this.state.seans.seansnumeryzajetychmiejsc[i].id_miejsca){
                    editseans.seansnumeryzajetychmiejsc[i].zajete = true;
                    console.log(editseans.seansliczbadostepnychbiletow);
                    editseans.seansliczbadostepnychbiletow = editseans.seansliczbadostepnychbiletow - 1;
                    editseans.seansliczbasprzedanychbiletow += 1;
            }
        }

        this.setState({
            seans:editseans
        })


        axios.request({
            method: 'put',
            url:`http://localhost:7777/seanse/${this.props.params.id}`,
            data: this.state.seans
          }).then(response => {
          }).catch(err => console.log(err));
        


        const bilet = ({biletId: id,nr_miejsca: this.state.nr_miejsca,id_seansu:this.props.params.id});
    
        fetch('http://localhost:7777/bilety', {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(bilet)
        }).then(() => {
            alert("Zakupiono bilet");
            this.props.navigate("/seanse");
        }).catch((error) => {
          console.error(error);
        })
    }

      fromValidation = () => {
        let nr_miejsca = false;
        let correct = false;

        let found = false;

        for(var i = 0; i<this.state.liczba_miejsc_na_sali; i++){

            if (this.state.nr_miejsca == this.state.seans.seansnumeryzajetychmiejsc[i].id_miejsca){
                if(this.state.seans.seansnumeryzajetychmiejsc[i].zajete === false ){
                    found = true;
                    nr_miejsca = true;
                    break;
                }
            }
        }

        if(found && nr_miejsca){
          correct = true;
        }
        return({
          nr_miejsca,
          correct
        })
      }


      handleSubmit = (e) =>{
        e.preventDefault()
        const validation = this.fromValidation()
        if(validation.correct){

          this.setState({
            nr_miejsca: '',
            errors:
            {
             nr_miejsca: false,
             }
            })

            this.addBilet();

        }
        else
        {
          this.setState({
            errors:
            {
              nr_miejsca: !validation.nr_miejsca
            }
          })
        }
      }


      handleChange = (e) =>{
        const name = e.target.name;
        const type = e.target.type;
        if(type === "text" || type === "number"){
          const value = e.target.value;
          this.setState({
            [name]: value
          })
      }
    }
      
      chunk = (a, size) => {
        return Array.from(Array(Math.ceil(a.length / size))).map((_,index) => a.slice(index * size,(index + 1) * size))
      }

        onButtonClick = (e) => {
            this.inputRef.current.value = e.target.value;
            this.setState({
                nr_miejsca: e.target.value
              })
        }

      render(){

        const { tablica_miejsc } = this.state;

        return(
            <div>

             <br/>
             <Button onClick={() => {this.props.navigate("/seanse") }} variant="secondary"><IoArrowBackCircleOutline size = {25}/> Wróć</Button>
             <h1 style = {{textAlign: "center"}}>
             <Badge bg="secondary">Kup Bilet</Badge>
             </h1>
             <h3 style = {{textAlign: "center"}}>
             <Badge bg="primary">Film:  {this.state.nazwa_filmu} </Badge> 
             <Badge bg="primary">Data: {this.state.seans.seansdata} </Badge>
             <Badge bg="primary">Godzina: {this.state.seans.seanshour} </Badge>
             </h3>


            <Form style = {{textAlign: "center"}} onSubmit={this.handleSubmit} noValidate>

            <Form.Group className="mb-3" controlId="nr_miejsca">
              <Form.Label>Numer miejsca: 
              <Form.Control ref={this.inputRef} type="number" name="nr_miejsca" placeholder= "" value={this.state.nr_miejsca} onChange={this.handleChange}/>
              {this.state.errors.nr_miejsca && <span>{this.messages.nr_miejsca_incorrect}</span>}
              </Form.Label>
            </Form.Group>
            <Button type = "submit" variant="dark" size="sm" >Kup bilet <FiShoppingCart size = {20}/></Button> 
    
            </Form>

            <br/>
            <br/>


            <h2 style = {{textAlign: "center"}}>
             <Badge bg="secondary">Rozmieszczenie krzesełek na sali</Badge>
            </h2>
             <br/>

            <table style = {{margin: "auto"}}>
                {
                    (() => {
                        console.log(this.inputRef)
                        if (!(tablica_miejsc instanceof Array)) {
                            return;
                        }

                        let container = [];
                        
                        const chunk = this.chunk(tablica_miejsc, 10);
                        for (const arr of chunk) {
                            let trBody = [];
                            for (const miejsce of arr) {
                                if (miejsce.zajete == true) {
                                    trBody.push(<td className="p-1"><button style = {{margin:"15px"}} className="btn btn-danger" disabled >{miejsce.id_miejsca}</button></td>)
                                } else {
                                    trBody.push(<td className="p-1"><button style = {{margin:"15px"}} className="btn btn-success" value={miejsce.id_miejsca} onClick={this.onButtonClick}>{miejsce.id_miejsca}</button></td>)
                                }
                            }
                            container.push(<tr>{trBody}</tr>)
                        }
                        return container;
                    })()
                }
            </table>



          </div>
        
        )
      }
}


export default withRouter(Addticket);