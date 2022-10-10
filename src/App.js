import React, { useEffect, useState } from 'react';
import MovieBox from './MovieBox';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import "./App.css";
import logo from './img_hero.png';



 


const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=79309cef3ff96d4de66e43cb7322d57b";



function App() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  },[]);

  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");

    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=79309cef3ff96d4de66e43cb7322d57b&query=${query}`;
      const res = await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);

    } 
    catch(e){
      console.log(e);

    }

  }
  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
   
  return (
   
    <>
     
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href='/home' className='benahi'>Benahi Movie App</Navbar.Brand>
        
        <Nav 
          className='me-auto my-2 my-lg-3'
           style={{maxHeight:'100px'}}>
            navbarScroll
          </Nav> 
        
      </Container>
    </Navbar>
    
    <img className='size' src={logo} alt="Logo" />


    <Form className='d-flex' onSubmit={searchMovie}>
        <FormControl
        type='search' placeholder='Movie Search'
        className='me-2' aria-label= 'search'
        name='query'
        value={query} onChange={changeHandler}>

        </FormControl>
        
        </Form>
    <div>
      {movies.length > 0 ?(
        <div className='container'>
        <div className='grid'>
        {movies.map((movieReq)=>
      <MovieBox key={movieReq.id} {...movieReq}/>)}
        </div>
    
    </div>
      ):(
        <h2>Movie Not Available</h2>
      )}
    
    
    </div>
    </>
   
  );
}

export default App;
