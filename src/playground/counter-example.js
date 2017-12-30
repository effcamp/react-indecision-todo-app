// use this.setState with a function
// don't forget to bind your function calls to this



class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0,
        }
    }
    componentDidMount() {
            const count = parseInt(localStorage.getItem('count'));
            this.setState(() => ({count}))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count){
            localStorage.setItem('count', this.state.count);
        }

    }
    handleAdd() {
        this.setState((prevState)=> ({count: prevState.count+1}));
    }
    handleMinus() {
        this.setState((prevState) => ({count: prevState.count-1}));
    }
    handleReset() {
        this.setState(() => ({count: 0}));
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAdd}>+1</button>
                <button onClick={this.handleMinus}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));














// let count = 0;
// const addOne = () => {
//     count++;
//     render();
// };
// const minusOne = () => {
//     count--;
//     render();
// };
// const reset = () => {
//     count = 0;
//     render();
// };
// const appRoot = document.getElementById('app');

// const render = () => {
//     const template2 = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>Reset</button>
//         </div>
//     );
    
//     ReactDOM.render(template2, appRoot);
// }
// render();



// //////////////////////////////////////////////////////////////////////////////////////////////
// const multiplier = {
//     numbers: [1,2,3,4,5],
//     multiplyBy: 4,
//     multiply() {
//         return this.numbers.map((x)=> x * this.multiplyBy);
//     }
// };

// console.log(multiplier.multiply());