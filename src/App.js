import HomePage from './HomePage';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "@mantine/carousel/styles.css";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router} from "react-router-dom";
function App() {
  return (
    <Router>
    <Provider store={store}>
    <MantineProvider>
      <Notifications />
    <div className="App">
      <HomePage />
    </div>
    </MantineProvider>
    </Provider>
    </Router>
  );
}

export default App;
