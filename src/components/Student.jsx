import { useState, useEffect } from "react";

const Student = (props) => {

    const[ints, setInts] = useState([]);

    useEffect(() => {
        setInts(props.interests);
    }, [])
    
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <h4>{props.major}</h4>
        <h4>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin ? 'is':'is not'} from Wisconsin.</h4>
        <h4>They have {props.interests.length} interests including...</h4>
        <ul>{
            ints.map(int => <li key = {props.id + int}>{int}</li>)
        }</ul>
    </div>
}

export default Student;