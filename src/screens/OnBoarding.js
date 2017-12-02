import React from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import OnBoardingContent from '../components/OnBoardingContent';
import { WHITE, PRIMARY } from '../constants/colors';
import strings from '../locales/strings';

const imgWelcome = require('../img/book.png');
const imgSecure = require('../img/shield.png');
const imgBackUp = require('../img/lifebuoy.png');
const imgGetStarted = require('../img/switch.png');

export default props => (
  <Swiper style={styles.wrapper} activeDotColor={PRIMARY}>
    <OnBoardingContent
      image={imgWelcome}
      label={strings.welcomeTitle}
      description={strings.welcomeDescription}
    />
    <OnBoardingContent
      image={imgSecure}
      label={strings.secureTitle}
      description={strings.secureDescription}
    />
    <OnBoardingContent
      image={imgBackUp}
      label={strings.backupTitle}
      description={strings.backupDescription}
    />
    <OnBoardingContent
      image={imgGetStarted}
      label={strings.getStartedTitle}
      description=""
      showButtons
      navigation={props.navigation}
    />
  </Swiper>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: WHITE,
  },
});
