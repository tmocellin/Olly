/*
* @flow
*/

import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { PlateformStyleSheet } from '../common/PlatformHelper';
import SettingRow from '../components/SettingRow';
import SliderRow from '../components/SliderRow';
import CheckBoxRow from '../components/CheckBoxRow';
import strings from '../locales/strings';
import { IOS_BACKGROUND, WHITE, DELETE_COLOR } from '../constants/colors';

type State = {
  passwordLength: number,
  autoGeneration: boolean,
};

class SettingsScreen extends Component<void, void, State> {
  state = {
    passwordLength: 18,
    autoGeneration: true,
  };

  setPasswordLength(length: number) {
    this.setState({
      passwordLength: length,
    });
  }

  setAutoGeneration(value: boolean) {
    this.setState({
      autoGeneration: value,
    });
  }

  deleteAllPasswords() {
    Alert.alert(strings.clear, strings.clearConfirmation, [
      { text: strings.cancel, style: 'cancel' },
      {
        text: strings.delete,
        onPress: () => console.log('all password delete'),
      },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <SliderRow
          label={strings.passwordLength}
          onValueChange={value => this.setPasswordLength(value)}
          selectedValue={this.state.passwordLength}
        />
        <CheckBoxRow
          label={strings.passwordAuto}
          iconName="star"
          isChecked={this.state.autoGeneration}
          switchValueChange={value => this.setAutoGeneration(value)}
        />
        <View style={styles.itemContainer}>
          <SettingRow
            label={strings.deleteAllPasswords}
            iconName="trash"
            iconBackground={DELETE_COLOR}
            iosOultine
            onPress={() => this.deleteAllPasswords()}
          />
        </View>
      </View>
    );
  }
}

export default SettingsScreen;

const styles = PlateformStyleSheet({
  container: {
    flex: 1,
    ios: {
      backgroundColor: IOS_BACKGROUND,
    },
    android: {
      backgroundColor: WHITE,
    },
  },
  itemContainer: {
    ios: {
      marginTop: 16,
    },
  },
});

/*
     <View style={styles.container}>
        <NavBar leftIconVisible={this._needsIconLeft()} leftClick={()=>this.props.goBack()} title={strings.settings}/>
        <SliderRow label={strings.passwordLength} onValueChange={(value)=>this.props.actions.setPasswordLength(value)}
          selectedValue={this.props.passwordLength}/>
        <View style={styles.itmCtnr}>
          <RowCheckBox label={strings.passwordAuto}
            iconName="star" isChecked={this.props.autoGen}
            switchValueChange={(value)=>this.props.actions.setAutoGen(value)} />
        </View>
        <View style={styles.itmCtnr}>
          <SettingRow label={strings.rateApp}
            iconName="star"/>
        </View>
        <View style={styles.itmCtnr}>
          <SettingRow label={strings.deleteAllPasswords}
            iconName="trash" iconCtnrColor={DELETE_COLOR} onPress={()=>this._deleteAll()}/>
        </View>
      </View>
    );
  }
}

export default Settings;

const styles = PlatformStyleSheet.create({
  container:{
    flex:1,
    ios:{
      backgroundColor:IOS_BACKGROUND,
    },
    android:{
      backgroundColor:WHITE,
    }
  },
  itmCtnr:{
    ios:{
      marginTop:ANDROID_MARGIN,
    }
  }
});
*/
