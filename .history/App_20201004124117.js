import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView, SafeAreaView} from 'react-native';
import NavBar from './src/components/NavBar';
import styled from 'styled-components/native';
import {Provider} from 'react-redux';
import store from './src/state/store';
import MySwitchNav from './src/navigation/AppNavigator';

const App = () => {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const isLandscape = width > height ? true : false;
  const [page, setPage] = useState('Home');
  const handleNav = (item) => {
    setPage(item);
  };

  useEffect(() => {
    const handleChange = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', handleChange);

    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <MySwitchNav>
        <SafeAreaView>
          <Provider store={store}>
            <MainView height={height} width={width}>
              <NavBar handleNav={handleNav} page={page} />
              {/* {page === 'Home' ? <Main isLandscape={isLandscape}/> : <Favorites handleNav={handleNav} isLandscape={isLandscape}/>} */}
            </MainView>
          </Provider>
        </SafeAreaView>
      </MySwitchNav>
    </>
  );
};

export default App;

const MainView = styled.View`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: whitesmoke;
  display: flex;
`;
