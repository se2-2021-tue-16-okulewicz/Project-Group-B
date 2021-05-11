import {
  ErrorInformation,
  IContactInfo,
} from "../contactInfo/contactInfoInterface";
import {
  BreedTypes,
  ColorTypes,
  EarsTypes,
  HairTypes,
  SizeTypes,
  SpecialMarkTypes,
  TailTypes,
} from "../dog/dogEnums";
import { ILostDog, ILostDogWithPicture } from "../dog/dogInterfaces";

export function isInvalidContactInfo(info: IContactInfo) {
  return {
    name: !isStringValidUsername(info.name),
    email: !isStringValidEmail(info.email),
    phoneNumber: !isStringValidPhoneNumeber(info.phoneNumber),
    total: !(
      isStringValidEmail(info.email) &&
      isStringValidUsername(info.name) &&
      isStringValidPhoneNumeber(info.phoneNumber)
    ),
  } as ErrorInformation;
}

//validate login/register
export function isStringValidPassword(password: string): boolean {
  return password.length <= 32 && password.length >= 6;
}

export function isStringValidUsername(username: string): boolean {
  return username.length <= 32 && username.length >= 3;
}

export function isStringValidPhoneNumeber(phone: string): boolean {
  let phoneNumberGarbage = new RegExp("[()\\s-]+", "g");
  let phoneNumber = new RegExp("^((\\+[1-9]?[0-9])|0)?[7-9]?[0-9]{9}$");
  if (phone === "") return false;
  phone = phone.replace(phoneNumberGarbage, "");
  return phoneNumber.test(phone);
}

export function isStringValidEmail(email: string): boolean {
  //Should catch like 99%+ of valid emails
  // eslint-disable-next-line
  let emailRegex: RegExp =
    /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
  return emailRegex.test(email);
}

//fix enum types
export function ValidateFetchedDog(dog: ILostDogWithPicture | ILostDog) {
  dog.breed = ValidateSelectedFeatures(dog.breed);
  dog.breed = Object.values(BreedTypes).includes(dog.breed) ? dog.breed : "";
  dog.specialMark = ValidateSelectedFeatures(dog.specialMark);
  dog.specialMark = Object.values(SpecialMarkTypes).includes(
    dog.specialMark as SpecialMarkTypes
  )
    ? dog.specialMark
    : SpecialMarkTypes.None;
  dog.size = ValidateSelectedFeatures(dog.size);
  dog.size = Object.values(SizeTypes).includes(dog.size) ? dog.size : "";
  dog.earsType = ValidateSelectedFeatures(dog.earsType);
  dog.earsType = Object.values(EarsTypes).includes(dog.earsType)
    ? dog.earsType
    : "";
  dog.hairLength = ValidateSelectedFeatures(dog.hairLength);
  dog.hairLength = Object.values(HairTypes).includes(dog.hairLength)
    ? dog.hairLength
    : "";
  dog.size = ValidateSelectedFeatures(dog.size);
  dog.size = Object.values(SizeTypes).includes(dog.size) ? dog.size : "";
  dog.color = ValidateSelectedFeatures(dog.color);
  dog.color = Object.values(ColorTypes).includes(dog.color) ? dog.color : "";
  dog.tailLength = ValidateSelectedFeatures(dog.tailLength);
  dog.tailLength = Object.values(TailTypes).includes(dog.tailLength)
    ? dog.tailLength
    : "";
  return dog;
}

export function ValidateSelectedFeatures(item: any) {
  return item == null ? "" : item.toString().trimEnd();
}
