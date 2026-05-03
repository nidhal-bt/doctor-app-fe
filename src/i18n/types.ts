import enCommun from "../../messages/en/common.json";
import enAuth from "../../messages/en/auth.json";
import enNav from "../../messages/en/nav.json";
import endoctor from "../../messages/en/doctor.json";
import enPatient from "../../messages/en/patient.json";
import enSecretary from "../../messages/en/secretary.json";

declare module "next-intl" {
  type IntlMessages = {
    common: typeof enCommun;
    auth: typeof enAuth;
    nav: typeof enNav;
    doctor: typeof endoctor;
    patient: typeof enPatient;
    secretary: typeof enSecretary;
  };
}
