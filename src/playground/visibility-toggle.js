class Visibility extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowHide = this.handleShowHide.bind(this);
        this.state = {
            visibility: false,
        };
    }
//////////////////////////////////// REMEMBER THIS SHIT ////////////////////////
    handleShowHide() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility,
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleShowHide}>
                    {this.state.visibility ? "Hide details" : "Show details"}
                </button>
                {this.state.visibility && <p>This is some text to show and then hide</p>}
            </div>
        );
    }
}
ReactDOM.render(<Visibility />, document.getElementById('app'));    