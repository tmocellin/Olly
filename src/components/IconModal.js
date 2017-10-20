/*
* @flow
*/

import React, { Component } from 'react';
import { Text, FlatList, TouchableOpacity, Dimensions, Animated, Easing, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeGlyphs from 'react-native-vector-icons/glyphmaps/FontAwesome';
import _ from 'lodash';

import { WHITE } from '../constants/colors';
import { ANDROID_MARGIN, IOS_STATUS_BAR_HEIGHT } from '../constants/dimensions';
import strings from '../locales/strings';
import TextField from '../components/TextField';
import { PlateformStyleSheet } from '../common/PlatformHelper';

type State = {
  data: Array<string>,
  searchValue: string,
};
type Props = {
  onSelectIcon: (icon: string) => void,
  isOpen: boolean,
  toggleModal: () => void,
};

const GLYPH_MAPS = {
  FontAwesome: FontAwesomeGlyphs,
};

const ICON_SETS = _.map({ FontAwesome }, (component, name) => ({
  name,
  component,
})).map((iconSet) => {
  // Some icons have multiple names, so group them by glyph
  const glyphMap = GLYPH_MAPS[iconSet.name];
  const newIconSet = iconSet;
  newIconSet.glyphs = _.values(_.groupBy(Object.keys(glyphMap), name => glyphMap[name]));
  return newIconSet;
});

const { width, height } = Dimensions.get('window');

class IconModal extends Component<Props, Props, State> {
  static defaultProps = {
    onSelectIcon: icon => console.log(icon),
    toggleModal: () => console.log('toogle modal'),
    isOpen: false,
  };
  state = {
    data: ICON_SETS[0].glyphs,
    searchValue: '',
  };
  animatedValue: Object;
  constructor(props: Props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }
  componentWillReceiveProps(nextProps: Props) {
    this.animateModal(nextProps.isOpen);
  }

  animateModal(open: boolean) {
    const toValue = open ? 1 : 0;
    Animated.timing(this.animatedValue, {
      toValue,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  selectIcon(iconName: string) {
    this.props.onSelectIcon(iconName);
    this.props.toggleModal();
  }

  search(value: string) {
    const result = _.values(
      _.filter(ICON_SETS[0].glyphs, data => data.join(', ').indexOf(value.toLowerCase()) > -1),
    );
    this.setState({
      searchValue: value,
      data: value.length > 0 ? result : ICON_SETS[0].glyphs,
    });
  }

  render() {
    const rowDimension = width / 4;
    const top = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });
    return (
      <Animated.View style={[styles.sView, { top }]}>
        <TextField
          fullWhite
          icon="search"
          placeholder={strings.search}
          value={this.state.searchValue}
          onChangeText={value => this.search(value)}
        />
        <FlatList
          data={this.state.data}
          numColumns={4}
          automaticallyAdjustContentInsets={false}
          initialListSize={40}
          keyExtractor={item => item[0]}
          renderItem={({ item }) =>
            renderItem(() => this.selectIcon(item[0]), item[0], rowDimension)}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.toggleModal()}>
          <Text style={styles.actionItm}>{strings.close}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const renderItem = (onPress: (name: string) => void, icon: string, dimension: number) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={[styles.row, { width: dimension, height: dimension }]}
    onPress={onPress}
  >
    <View style={styles.iconCtnr}>
      <FontAwesome name={icon} size={40} color="white" />
    </View>
  </TouchableOpacity>
);
export default IconModal;

const styles = PlateformStyleSheet({
  sView: {
    elevation: 7,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ios: { paddingTop: IOS_STATUS_BAR_HEIGHT },
    android: { paddingTop: ANDROID_MARGIN },
  },
  actionItm: {
    fontSize: 22,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: ANDROID_MARGIN,
    marginTop: ANDROID_MARGIN,
  },
  row: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: 70,
    height: 70,
  },
  iconCtnr: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
