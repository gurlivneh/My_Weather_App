import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import * as Images from '../images/index'


const CurrentBox = (props) => {
  const [iconImage, setIconImage] = useState();
  const weatherIcon = props.currentWeather.WeatherIcon
  const setIcon = () => {
    if (weatherIcon === 3 || weatherIcon === 4 || weatherIcon === 6) {
      
    }

  }
  return (
    <>
      <MainView height={props.height} width={props.width}>
        <CurrentText>{props.city}</CurrentText>
        <CurrentText>{props.currentWeather.WeatherText}</CurrentText>
        <CurrentText>
          {props.currentWeather.Temperature.Imperial.Value +
            props.currentWeather.Temperature.Imperial.Unit}
        </CurrentText>
        <Logo source={Images.SUNNY} />
      </MainView>
    </>
  );
};

export default CurrentBox;

 const MainView = styled.View`
  width: ${(props) => (props.width > props.height ? 15 : 95)}%;
  height: ${(props) => (props.width > props.height ? 80 : 55)}%;
  justify-content: center;
  align-items: center;
  background-color: white;
  display: flex;
  elevation: 20;
  border-radius: 7px;
  margin:10px;
`;

 const CurrentText = styled.Text`
  font-size: 18px;
`;

const Logo = styled.Image`
  width: 50px;
  height: 50px;
  margin:5px;
  background-color: #1da1f2;

`;

