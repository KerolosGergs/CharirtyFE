export interface NavigationTab {
  id: number;
  label: string;
  active: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
}

export interface SocialMediaLink {
  platform: string;
  icon: string;
  url: string;
}

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  value: string;
  iconClass?: string;
}
export interface IHelpType {
  id: number
  name: string
}
export interface HelpRequest {
  name: string
  email: string
  phoneNumber: string
  notes: string
  helpTypeId: number
}
