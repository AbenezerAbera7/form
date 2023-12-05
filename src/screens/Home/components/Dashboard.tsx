import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');


export default class ForumPosts extends Component {

    constructor(props: any) {
        super(props)

        this.state = {
          loading: false,
          docCount: 0,
          docLimit: 3,
          startAfter: 0,
          finishedDocs: false,
          vidList: [],
          feedbackText: '2',
          queryDist: 2,
          enteredStories: [],
          alerts: [],
          voteDict: {}
        }

    }

    componentWillUnmount(){}

    renderTitleCard(){
        return (
            <View style = {{width: width*0.9, height: 60, borderRadius: 10, backgroundColor: 'rgb(20,20,20)', flexDirection: 'row'}}>
                <Text style = {{fontSize: 40, fontWeight: '900', alignSelf: 'center', marginBottom: 20, color: 'white', marginLeft: 20, marginRight: 20}}>{'Dashboard'}</Text>
                <Text style = {{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20, color: 'white'}}>{'All'}</Text>
                <Text style = {{fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20, color: 'white'}}>{'Last 90 days'}</Text>
                <></>
            </View>
        )
    }

    render() {
       return (<SafeAreaView style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgb(256,256,256)', width: width}}>

                    {this.renderTitleCard()}
                  </SafeAreaView>
          )
    }
}

const styles = StyleSheet.create({
  backContainer:
  {
      flex: 1,
      backgroundColor: '#00FFFF' // Set your own custom Color
  },
  frontContainer:
  {
      flex: 1,
      backgroundColor: '#00FFFF'

  },
  ScrollView :
  {

      backgroundColor: '#FFFFFF',
      width: width,
      justifyContent: 'center',
      alignItems: 'center'
  },
  button: { height: 45, padding: 10, marginBottom: 5, marginTop: 20, width: '100%', backgroundColor: 'rgba(62,131,245, 1)', borderColor: '#D3D311',  borderRadius: 4 },

});