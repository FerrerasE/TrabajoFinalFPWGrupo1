import nosotros from '../Data/nosotros.json';

function About(){
    // const getRandomAnimal = () => {
    //     const animals = animalsP.animals;
    //     const randomIndex = Math.floor(Math.random() * animals.length);
    //     return animals[randomIndex];
    // };
    // const alumno1 = nosotros.alumno1;
    // const [alumnos, setAlumnos]= useState([])
    // useEffect(() => {
    //     fetch("Data/nosotros.json")
    //     .then(response => response.json)
    // })

    const getAlumno = () => {
        const alumno1 = nosotros.alumno1;
        const alumno2 = nosotros.alumno2;
        const alumno3 = nosotros.alumno3;
        const alumno4 = nosotros.alumno4;
        const alumno5 = nosotros.alumno5;
        // const mostrar =  nosotros.length;
        // return nosotros[mostrar];
    };

    
    return(
         <h2>Alumnos del Grupo 1: </h2>
        // <div>
        //     {nosotros.map((data, key) => {
        //         return <h1 key={key}>{data.company}</h1>;
        //     })}
        // </div>
        
    )

}
export default About;