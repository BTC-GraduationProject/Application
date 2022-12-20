// [ 세팅화면 - 메인 ]
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const MainSetting = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.titleText}>설정</Text>
        </View>
        <View style={{flex: 6, alignItems: 'center'}}>
            <TouchableOpacity
                style={styles.content}
                onPress={()=>navigation.navigate('UserSetting')}
            >
                <Text style={styles.contentTitle}>사용자 정보 설정</Text>
                <Ionicon name='chevron-forward' size={30} style={styles.contentIcon}/>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.content}
                onPress={()=>navigation.navigate('NoticeSetting')}
            >
                <Text style={styles.contentTitle}>알림 설정</Text>
                <Ionicon name='chevron-forward' size={30} style={styles.contentIcon}/>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
                style={styles.content}
                onPress={()=>navigation.navigate('DisplaySetting')}
            >
                <Text style={styles.contentTitle}>디스플레이 설정</Text>
                <Ionicon name='chevron-forward' size={30} style={styles.contentIcon}/>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={styles.content}
                //onPress={()=>navigation.navigate('Login')}
                onPress={() => Alert.alert(
                    '로그아웃',
                    '정말 로그아웃 하시겠습니까?',
                    [
                        {text: '취소', onPress: () => {}, style: 'cancel'},
                        {text: '확인', onPress: () => {navigation.navigate('Login')}, style: 'destructive'}
                    ]
                )}
            >
                <Text style={[styles.contentTitle, {color: 'red'}]}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        flex: 1,
        //backgroundColor: 'yellow',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    titleText: {
        fontSize: 40,
        fontWeight: '600',
        paddingTop: 30,
        color: '#485460',
    },
    content: {
        //backgroundColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#485460',
        height: '10%',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    contentTitle: {
        //backgroundColor: 'yellow',
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: '600',
        color: '#485460',
    },
    contentIcon: {
        //backgroundColor: 'green',
        marginRight: 10,
    },
});

export default MainSetting;