/* istanbul ignore file */
import { Alert } from 'react-native';
import { STRINGS } from '../constants/strings';

export const showAlert = (message, onClick = undefined) => {
  Alert.alert(
    STRINGS.appName,
    message,
    [{ text: 'OK', onPress: () => onClick !== undefined && onClick() }],
    {
      cancelable: false,
    }
  );
};

export const showActionAlert = (message, action) => {
  Alert.alert(STRINGS.appName, message, [{ text: 'OK', onPress: action }], {
    cancelable: false,
  });
};

export const showOptionAlert = (message, action) => {
  Alert.alert(
    STRINGS.appName,
    message,
    [{ text: 'OK', onPress: action }, { text: 'Cancel' }],
    { cancelable: false }
  );
};
