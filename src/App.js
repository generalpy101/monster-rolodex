import "./App.css";
import { Component } from "react";

import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.component.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsters: [],
            searchTerm: "",
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                this.setState(() => {
                    return {
                        monsters: data,
                    };
                });
            });
    }

    onSearchChange = (e) => {
        const monsterName = e.target.value;
        this.setState({ searchTerm: monsterName.toLowerCase() });
    };

    render() {
        const { monsters, searchTerm } = this.state;
        const { onSearchChange } = this;
        const filteredMonsters = monsters.filter((monster) => {
            return monster.name.toLowerCase().includes(searchTerm);
        });
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
}

export default App;
