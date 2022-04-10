

function ErrorMessage(props) {
    let message = '';

    if (props.error === '404') {
        message = '404 - Not Found'
    } 

    return (
        <div id="ErrorMessage">
            <h1>{message}</h1>
        </div>
    );
}

export default ErrorMessage;
