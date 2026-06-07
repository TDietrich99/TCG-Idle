import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { game } from "game";


function App() {
    var [game] = React.useState(() => new Game());

    const [, forceUpdate] =
        React.useState(0);

    // UI refresh
    React.useEffect(() => {

        const interval = setInterval(() => {
            forceUpdate(v => v + 1);
        }, 100);

        return () => clearInterval(interval);

    }, []);

    return (
        <div>

            <h1>Idle Game</h1>

            <div className="box">
                <h2>
                    Gold: {game.player.money.display()}
                </h2>
                <button onClick={() => game.clickGold()}>
                    +1 Gold
                </button>
            </div>

            <div className="box">
                {game.player.dimensions.map((dim, index) =>(

                    <div>
                        <h2>Dimension {index + 1}: {dim.display()}</h2>
                        <button onClick={()=>dim.buy(1)}>
                            Buy 1: (Cost: {dim.getCost()})
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={()=>game.deleteGame()}>
                    Hard Reset
                </button>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);