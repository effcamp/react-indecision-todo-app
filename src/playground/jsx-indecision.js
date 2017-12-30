// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
console.log("app.js is running!");

const app = {
    title: "Indecision App",
    subtitle: "Be more decisive!",
    options: [],
};
const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if (option && !(app.options.indexOf(option) > -1)) {
        app.options.push(option);
        e.target.elements.option.value = "";
        render();
    }
    else {
        e.target.elements.option.value = "";
    }
    
};
const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};
const onRemoveAll = () => {
    app.options = [];
    render();
};

const render = () => {

    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? "Here are your options:" : "No options available!"}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Removal All</button>

            <ol>
            {app.options.map((option) => <li key={option}>{option}</li>)}   
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
}
const appRoot = document.getElementById('app');
render();
