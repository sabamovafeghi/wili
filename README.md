# wili
Wili  is a 2kb Light-weight react-like maximum-optimistic library for building user interfaces.

## Usage

Welcome componenet:

    class Welcome extends Wili.Component {
        state = {i: 0, interval: null}
        componentDidMount = () => {
            this.state.interval = setInterval(() => {
                this.setState({i: this.state.i + 1})
            }, 1000)
        }
        componentDidUnmount = () => clearInterval(this.state.interval)
        render = () => `<p>Welcome to Wili project. Forcing update No. ${this.i}</p>`;
    }

App componenet:

    class App extends Wili.Component {
        render = () => {
            return `<div class="dark-theme">
                        <div class="header">
                            <h1>Wili framework</h1>
                        </div>
                        <div class="content">
                            ${new Welcome()}
                        </div>
                    </div>`;
        }
    }
  
Index file:


    <html>
        <head>
            <title>Wili</title>
        </head>
        <body>
            <div id="root"></div>
        </body>
        <script src="wili.js"></script>
        <script src="wili-components.js"></script>
        <script>
            Wili.build("root", new App());
        </script>
    </html>

## Related libraries
 - [Wili Router](https://github.com/pwwiur/wili-router): A 1kb light-weight maximum optimistic router for Wili library.
