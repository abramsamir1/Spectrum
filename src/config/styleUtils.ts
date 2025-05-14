import { Dimensions } from "react-native"


export const dimensions = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
}

export const dimensionsCalculation = (IPhonePixel: number) => {
  return (dimensions.WIDTH * IPhonePixel) / 375
}
