
import nosotros from '../Data/nosotros.json';
import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function About(){

    return(
        nosotros.map((nos) => (
            <Card key={nos.id}>
                <Card.Body>
                    <Card.Title>{nos.nombre}</Card.Title>
                    <Card.Text>
                        Trabajo: {nos.trabajo}
                        <br/>
                        Link del Git Hub: {nos.link} 

                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    );

}
export default About;