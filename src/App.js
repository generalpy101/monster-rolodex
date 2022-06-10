import "./App.css";
import { Component } from "react";

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
                this.setState(
                    () => {
                        return {
                            monsters: data,
                        };
                    },
                    () => {
                        console.log(this.state.monsters);
                    }
                );
            });
    }

    onSearchChange = (e) => {
        console.log(e.target.value);
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
                <input
                    type="search"
                    placeholder="Enter name"
                    className="search-bar"
                    onChange={onSearchChange}
                />
                {filteredMonsters.map((monster) => (
                    <h1 key={monster.id}>{monster.name}</h1>
                ))}
            </div>
        );
    }
}

export default App;
