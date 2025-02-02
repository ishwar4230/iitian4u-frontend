import HomePage from './HomePage';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
    <MantineProvider>
    <div className="App">
      <HomePage />
    </div>
    </MantineProvider>
    </Provider>
  );
}

export default App;
