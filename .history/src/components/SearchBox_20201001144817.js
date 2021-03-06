import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import * as Actions from '../state/actions';
import Autocomplete from 'react-native-autocomplete-input';
import * as MockData from '../mockData/mockData';
import {useDispatch, useSelector} from 'react-redux';


const isMock = true;
const SearchBox = () => {
  const [keyword, setKeyword] = useState();
  const [autoCompleteRes, setAutoCompleteRes] = useState([]);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);


  const error = useSelector(
    (state) => state.reducer.error,
    () => {},
    );
    
  const dispatch = useDispatch();

  const handleTextChange = (text) => {
    console.log("auto complete res", autoCompleteRes, "text to send", text)
    setKeyword(text);
    if (isMock) {
      if (text.length > 0) {
        setAutoCompleteRes(MockData.autocompleteKeyLocationRes);
      } else {
        setAutoCompleteRes([]);
      }
    } else {
      if (text.length > 0) {
        Actions.getAutoComplete(text).then((res) => {
          if (res.Code) {
            dispatch(Actions.setError(res.Message));
          } else {
            setAutoCompleteRes(res);
          }
        });
      } else {
        setAutoCompleteRes([]);
      }
    }
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
        <MainView height={height} width={width}>
            <MyAutoComplete
              data={autoCompleteRes}
              defaultValue={keyword}
              placeholder="city"
              listContainerStyle={{height: 70}}
              onChangeText={(text) => handleTextChange(text)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setAutoCompleteRes([]);
                    setKeyword(item.LocalizedName);
                    selectCity(item.Key, item.LocalizedName);
                  }}>
                  <Text>{item.LocalizedName}</Text>
                </TouchableOpacity>
              )}
            />
        </MainView>
    </>
  );
};

export default SearchBox;

const MainView = styled.View`
  width: 220px;
  height:100px;
  background-color:green;
  display:flex;
  flex-direction:column;
  /* justify-content:center; */
  /* align-items:center; */
`;

const MyAutoComplete = styled(Autocomplete)`
  height: 40px;
  background-color: lightskyblue;
`;
