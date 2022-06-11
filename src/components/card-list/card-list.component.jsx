import Card from "../card/card.component.jsx"

import "./card-list.styles.css"

const CardList = ({ monsters }) => (
    <div className="card-list">
        {monsters.map(monster => {
            return (
                <Card key={monster.id} monster={monster} />
            )
        })}
    </div>
)


export default CardList;