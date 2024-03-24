export interface ITranslation {
  t: {
    LogIn?: string;
    onError?: string;
    requiredName?: string;
    requiredPassword?: string;
    successLog?: string;
    LogOut?: string;
    LogOutMessage?: string;
    Language?: string;
    home?: string;
    logInTitle?: string;
    logo?: string;
    username?: string;
    password?: string;
    email?: string;
    forget?: string;
    click?: string;
    sinUp?: string;
    sinUpTitle?: string;
    greeting?: string;
    OwnNotFound?: string;
    product?: string;
    cart?: string;
    Footer?: string;
    requiredEmail?: string;
    requiredPhone?: string;
    requiredCode?: string;
    requiredAddress?: string;
    requiredCity?: string;
    requiredCountry?: string;
    requiredZip?: string;
    requiredState?: string;
    requiredCardNumber?: string;
    requiredCvv?: string;
    requiredExpiry?: string;
    requiredMessage?: string;
    phone?: string;
    ButForget?: string;
    contactUs?: string;
    desForgot?: string;
    sin?: string;
    for?: string;
    senUpMes?: string;
    articles?: string;
    blogs?: string;
    aboutUs?: string;
    profile?: string;
    contactTitle?: string;
    contactDesc?: string;
    contactName?: string;
    contactEmail?: string;
    contactMessage?: string;
    contactSubmit?: string;
    name?: string;
    age?: string;
    requiredAge?: string;
    gender?: string;
    requiredGender?: string;
    male?: string;
    female?: string;
    weight?: string;
    requiredWeight?: string;
    height?: string;
    requiredHeight?: string;
    save?: string;
    profileTitle?: string;
    profileDesc?: string;
    uploadImage?: string;
    requiredUpload?: string;
    requiredCategory?: string;
    sports?: string;
  };
}

enum LangsType {
  en = 'en',
  ar = 'ar'
}

export interface StoreType {
  user: {
    currentUser: null;
    currentLang: LangsType;
  };
}
