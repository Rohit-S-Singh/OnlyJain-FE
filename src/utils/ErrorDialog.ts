/* istanbul ignore file */
import { showAlert } from './showAlert';
import { STRINGS } from '../constants/strings';

let isShowAlert = false;
export const showErrorDialog = (newPropsParam: any) => {
  if (newPropsParam) {
    let newProps = newPropsParam;

    switch (newProps.status) {
      case 400:
        showAlert(newProps?.data?.message);

        break;
      case 401:
        showAlert(newProps.message);
        break;

      case 404:
        showAlert(newProps?.data?.message);
        break;

      case 500:
        showAlert(newProps?.data?.message || STRINGS.internalServer);
        break;

      // default:
      //   showAlert(newProps.message);
      //   break;
    }
  } else {
    showAlert(STRINGS.pleaseTryAgain);
  }
};
