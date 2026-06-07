function App() {

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
                    Gold: {game.gold.display()}
                </h2>

                <button onClick={() => game.clickGold()}>
                    +1 Gold
                </button>
                <button onClick={() => game.clickGold2()}>
                    *2 Gold
                </button>
            </div>

        </div>
    );
}

const root =
    ReactDOM.createRoot(
        document.getElementById("root")
    );

root.render(<App />);