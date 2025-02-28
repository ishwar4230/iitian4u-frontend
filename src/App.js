import HomePage from './HomePage';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
    <MantineProvider>
      <Notifications />
    <div className="App">
      <HomePage />
    </div>
    </MantineProvider>
    </Provider>
  );
}

export default App;
