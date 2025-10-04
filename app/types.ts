export type RootStackParamList = {
  Kayıtlarım: undefined;
  'Yeni Kayıt': undefined;
  Detay: { recording: Recording };
};

export type Recording = {
  id: string;
  name: string;
  date: string;
};