export interface AgreementProps {
  marketing_consent: boolean;
  marketing_updated_at: string;
  service_push_consent: boolean;
  service_updated_at: string;
}

export interface UserProps {
  nickname: string;
  email: string;
  phoneNumber: string;
  categoryList: string[];
  agreementDto: AgreementProps;
  role: string;
  img: string | null;
}