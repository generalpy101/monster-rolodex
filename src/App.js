import "./App.css";
import { useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.component.jsx";

function App() {
    /* 
    Syntax :
        useState(default_state)
        useState returns 2 values which are usually destructured by using array 
        destructuring. These 2 values are a variable for state and its setter. Each
        state has its own variable which must be created using useState.
    */
    const [searchString, setSearchString] = useState("");
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    /*
    Syntax :
        useEffect(callback,[dependencies])
        Callback is called either acoording to lifecycle, onMount and on state update 
        or when dependencies which is a array which contains values, generally states
        which this useEffect must track. It is always called once when component is mounted.
        Empty dependencies array means only call once during mount.
        We will use empty array here as out users are staying same, so we only need to call the 
        callback once.
    */
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setMonsters(data);
            });
    }, []);


    /*
        Here we want to change filteredMonsters only when state related to it changes,
        if we simple wrote it in function, in every render call, related or unrelated to 
        filteredMonsters is changed. So we created a new effect which fires when monseters
        and searchString changes which are passed as dependencies.
    */
    useEffect(() => {
        const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLowerCase().includes(searchString);
        });

        setFilteredMonsters(newFilteredMonsters);
    },[monsters,searchString])

    const onSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchString(value);
    };


    return (
        <div className="App">
            <h1 className="app-title">Monsters Rolodex Clone</h1>
            <SearchBox
                onChangeHandler={onSearchChange}
                className="monsters-search-box"
                placeHolder="Search monsters..."
            />
            <CardList monsters={filteredMonsters} />
        </div>
    );
}

export default App;
