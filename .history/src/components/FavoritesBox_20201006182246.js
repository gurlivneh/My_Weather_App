import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'
import * as Actions from '../state/actions'


const FavoritesBox = (props) => {
  const [iconImage, setIconImage] = useState();
  const [favoriteCurrentWeather, setFavoriteCurrentWeather] = useState();

  // const weatherIcon = FavoriteCurrentWeather.WeatherIcon

  useEffect(() => {
     Actions.getFavoriteCurrentWeather(props.locationKey, setFavoriteCurrentWeather)

    // Images.iconsArray.forEach((item => {
    //   if (item.code === weatherIcon) {
    //     setIconImage(item.path)
    //   }
    // }))

  },[]);
  return (
    
    <MainView
      height={props.height}
      width={props.width}
      onPress={() => {
        props.selectCity(props.locationKey, props.city);
        props.navigation.navigate('Main');
      }}
    >
        <CurrentText>{props.city}</CurrentText>
      {favoriteCurrentWeather &&<CurrentText>{FavoriteCurrentWeather.WeatherText}</CurrentText>}
      {favoriteCurrentWeather && <CurrentText>
        {FavoriteCurrentWeather.Temperature.Imperial.Value +
          FavoriteCurrentWeather.Temperature.Imperial.Unit}
      </CurrentText>}
      {iconImage &&  <Logo source={iconImage} />}
      </MainView>
  );
};

export default FavoritesBox;

 const MainView = styled.TouchableOpacity`
  width: ${(props) => (props.width)}px;
  height: ${(props) => (props.height)}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (true ? "white" : "#D3D3D3")};
  display: flex;
  elevation: 5;
  border-radius: 7px;
  margin:10px;
  padding:10px;
`;

 const CurrentText = styled.Text`
  font-size: 16px;
  text-align:center;
`;

const Logo = styled.Image`
  margin:5px;

`;

