// [ 식재료 리스트 화면 - 식재료 정보 화면 ]
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MainTabContext } from '../mainTab';

const FoodInfo = ({route, navigation}) => {
  const { usrIdx, usrName, usrId } = useContext(MainTabContext);  // 로그인 시 DB로부터 받아온 사용자의 idx, userName을 Login->MainTab 통해서 전달 받음
  const { foodPhoto, foodName, categoryIdx, amount, storageType, expirationDate, foodIdx, ed_Left} = route.params;
  console.log(route.params);
  const [categoryStr, setCategoryStr] = useState(categoryIdx); // 카테고리 텍스트 정보 state
  const [storageTypeStr, setStorageTypeStr] = useState(storageType); // 저장방식 텍스트 정보 state
  // 카테고리 텍스트로 변환
  if (categoryStr === 1) {
    setCategoryStr("유제품");
  } else if (categoryStr === 2) {
    setCategoryStr("육류");
  } else if (categoryStr === 5) {
    setCategoryStr("가공식품");
  } else if (categoryStr === 6) {
    setCategoryStr("빵");
  } else if (categoryStr === 7) {
    setCategoryStr("생선");
  } else if (categoryStr === 8) {
    setCategoryStr("채소");
  } else if (categoryStr === 9) {
    setCategoryStr("갑각류");
  } else if (categoryStr === 10) {
    setCategoryStr("음료");
  } else if (categoryStr === 99) {
    setCategoryStr("기타");
  }
  // 저장방식 텍스트로 변환
  if (storageTypeStr === 1) {
    setStorageTypeStr("실온보관");
  } else if (storageTypeStr === 2) {
    setStorageTypeStr("냉동보관");
  } else if (storageTypeStr === 3) {
    setStorageTypeStr("냉장보관");
  }

  const pressDelete = () => { // 식재료 삭제 요청
    fetch(`https://www.bigthingiscoming.shop/app/foods/${usrIdx}/${foodIdx}/delete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(response => {
        switch(response.code){
          case 1000:
            Alert.alert(
              "식재료 삭제 완료.",
              '식재료가 삭제되었습니다.',
              [{
                  text: "OK", 
                  onPress: () => {
                      navigation.goBack(); // 식재료 리스트 화면으로 돌아가기
                  }
              }]);
            console.log(response.code, "Successfully Deleted!!");
            break;
          case 2003:
            console.log(response.code, response.message);
        }
        console.log(response);
      })
      // .then(response => {{console.log(response);}})
      .catch(error => {console.log('Fetch Error', error);})
    // Alert.alert(
    //     '식재료 삭제',
    //     '정말 삭제 하시겠습니까?',
    //     [
    //         {text: '취소', onPress: () => {}, style: 'cancel'},
    //         {text: '확인', onPress: () => {}, style: 'destructive'}
    //     ]
    // )
  }

  // 렌더링 영역    
  return (
    <View style={styles.container}>
        <View style={styles.infoView}>
            <View style={styles.mainInfo}>
                <View style={styles.photoView}>
                    <Image style={styles.photo} source={{url : foodPhoto}}/>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{foodName}</Text>
                </View>
            </View>
            <View style={styles.subInfo}>
              <View style={styles.infoName}>
                <Text style={styles.infoText}>카테고리</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.infoValueText}>  :  {categoryStr}</Text>
              </View>
            </View>
            <View style={styles.subInfo}>
              <View style={styles.infoName}>
                <Text style={styles.infoText}>수량</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.infoValueText}>  :  {amount}</Text>
              </View>
            </View>
            <View style={styles.subInfo}>
              <View style={styles.infoName}>
                <Text style={styles.infoText}>저장방식</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.infoValueText}>  :  {storageTypeStr}</Text>
              </View>
            </View>
            <View style={styles.subInfo}>
              <View style={styles.infoName}>
                <Text style={styles.infoText}>유통기한</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.infoValueText}>  :  {expirationDate} 까지</Text>
                <Text style={ed_Left <= 3 ? [styles.infoValueText, {color: 'red'}] : styles.infoValueText}>  ({ed_Left}일 남음)</Text>
              </View>
            </View>
        </View>
        <View style={styles.bottomView}>
            {/* 수정 버튼 */}
            <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('FoodInfoModify', {
                    foodData : route.params
                })}
            >
                <Text style={styles.buttonText}>정보 수정</Text>
            </TouchableOpacity>
            {/* 삭제 버튼 */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => 
                  Alert.alert(
                    "식재료 삭제",
                    '정말 삭제 하시겠습니까?',
                    [
                      {text: '취소', onPress: () => {}, style: 'cancel'},
                      {text: '확인', onPress: () => {pressDelete()}, style: 'destructive'}
                    ])
                }
            >
                <Text style={[styles.buttonText, {color: 'red'}]}>삭제</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        //backgroundColor: 'skyblue'
    },
    infoView: {
        flex:5,
        //borderWidth: 1,
        //borderRadius: 20,
        borderColor: '#545454',
        backgroundColor: '#E5EBFF',
    },
    bottomView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'pink'
    },
    mainInfo: {
        flex: 3,
        borderWidth: 0.2,
        borderRadius: 20,
        borderColor: '#545454',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        //backgroundColor: 'gray',
    },
    photoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: '80%',
        height: '70%',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#545454',
    },
    nameView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: '600',
        color: '#485460',
    },
    subInfo: {
        flex: 1,
        borderWidth: 0.2,
        borderRadius: 10,
        // borderColor: '#545454',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        marginTop: 0.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoName: {
      flex: 1,
      backgroundColor: '#E5EBFF',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
      alignItems: 'center',
    },
    infoText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#485460',
    },
    infoValue: {
      flex: 5,
      //backgroundColor: 'red',
      flexDirection: 'row'
    },
    infoValueText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#485460',
    },
    button: {
        backgroundColor: '#E5EBFF',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'grey',
        width: '40%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        //backgroundColor: 'yellow',
        color: '#545454',
        fontSize: 15,
        fontWeight: '700'
    },
});

export default FoodInfo;