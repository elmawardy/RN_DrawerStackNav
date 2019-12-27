import React, { Component } from 'react';
import { Provider as PaperProvider,Appbar,IconButton,Button as PButton,Avatar} from 'react-native-paper';
import { StyleSheet,StatusBar,View,Image,Button,Text,ScrollView,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';


class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sideMenuOpen:false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ _handleSearch: this._handleSearch });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'PrintApp',
      headerRight: () => (
        <View style={{flex:1,flexDirection:'row'}}>
          <IconButton
            icon="thumb-up"
            color="white"
            size={25}
            onPress={navigation.getParam('_handleSearch')}
          />
          <IconButton
            icon="dots-vertical"
            color="white"
            size={25}
            onPress={() => console.log('Pressed')}
          />
        </View>
      ),
    }
  };

  _handleSearch = () => console.log('Searching');

  _handleMore = () => console.log('Shown more');

  toggleSideMenu() {
    console.log(this.state.sideMenuOpen)
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen,
    });
  }

  render() {
    return (
        <PaperProvider>
          <StatusBar backgroundColor="#1666b5" barStyle="light-content" />
          <Appbar style={styles.appbar}>
            <Appbar.Action
              onPress={this.toggleSideMenu.bind(this)}
              icon="menu"
            />
            <Appbar.Content
              title="PrintApp"
              subtitle="Home"
            />
            <Appbar.Action icon="thumb-up" onPress={this._handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
          </Appbar>


          <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
            <View>
              <Icon name="file-upload" size={190} color="gray" />
            </View>
            <PButton mode="contained" color="#1976d2" onPress={() => console.log('Pressed')}>
              Upload
            </PButton>
          </View>
        </PaperProvider>
    );
  }
}



const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    backgroundColor:'#1976d2'
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1.5, y: 1.5}} colors={['#7ea7cf', '#1a71c7', '#1976d2']} style={styles.linearGradient}>
      <View style={{height:170,flex:1,alignItems:'center',flexDirection:'row'}}>
         <Avatar.Image style={{marginLeft:10}} size={50} source={{uri:'https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg'}} />
         <Text style={{ marginLeft:10,fontSize:20,fontWeight:'bold',color:'white'}}>Muhammad Ali</Text>
      </View>
    </LinearGradient>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);


const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (
          <Icon name="home" size={24} color="#717171" />
      ),
    }
  },
  Notifications: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Print History',
      drawerIcon: (
          <Icon name="history" size={24} color="#717171" />
      ),
    }
  },
  Locations: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Available Printers',
      drawerIcon: (
          <Icon name="map-marker" size={24} color="#717171" />
      ),
    }
  },
  Info: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: (
          <Icon name="information-variant" size={24} color="#717171" />
      ),
    }
  },
},
{
  contentComponent: CustomDrawerContentComponent,
});


const StackNavigator = createStackNavigator(
  {
    // Home: {
    //   screen: HomeScreen,
    // },
    DrawerNav:MyDrawerNavigator
  },
  {
    initialRouteName: 'DrawerNav',
    headerMode: 'none',
    /* The header config from HomeScreen is now here */
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: '#1976d2',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // },
    // navigationOptions: {
    //   tabBarLabel: 'Home!',
    // },
  }
);

// const MyApp = createAppContainer(MyDrawerNavigator);


const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
