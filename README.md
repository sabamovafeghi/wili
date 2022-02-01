# wili
Wili  is a 2kb Light-weight react-like maximum-optimistic library for building user interfaces.

## Usage

Componenets:

  class Welcome extends Wili.Component {
      i = 0;
      interval;
      componentDidMount = () => {
          this.interval = setInterval(() => {
              this.i++;
              this.forceUpdate();
          }, 1000)
      }
      componentDidUnmount = () => clearInterval(this.interval)
      render = () => `<p>Welcome to Wili project. Forcing update No. ${this.i}</p>`;
  }
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
  };
  
  `index.html` file:
  
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

