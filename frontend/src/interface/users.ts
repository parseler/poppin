export interface AgreementDto {
  marketing_consent: boolean;
  marketing_updated_at: string;
  service_push_consent: boolean;
  service_updated_at: string;
}

export interface UserData {
  nickname: string;
  email: string;
  phoneNumber: string;
  categoryList: string[];
  agreementDto: AgreementDto;
  role: string;
  img: string | null;
}