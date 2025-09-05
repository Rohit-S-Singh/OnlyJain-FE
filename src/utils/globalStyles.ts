import { Color } from "./color";
import { isTablet, normalize } from "./constants";
import { getFontSize } from "./fonts";

export const globalStyles = {
  straightLineStyle: {
    width: 4,
    backgroundColor: Color.dividerBlue,
    height: 48,
    marginRight: isTablet ? normalize(5) : normalize(8),
    borderRadius: 4,
  },
  initialsText: {
    color: Color.white,
    fontSize: getFontSize(16),
    fontWeight: "bold",
  },
};
