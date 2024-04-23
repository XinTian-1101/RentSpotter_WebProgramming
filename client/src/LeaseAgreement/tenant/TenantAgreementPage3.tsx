import { lessorSignatureUrl } from "@/component/AgreementComponents/agreement-signals";
import { AgreementTerm } from "component/AgreementComponents/agreeement-term";
import { AgreementWrapper } from "component/AgreementComponents/agreement-wrapper";
import { TermEighteen, TermSeventeen } from "LeaseAgreement/AgreementText";

const TenantAgreementPage3 = () => {
  const localStorageLessorSignUrl = JSON.parse(
    localStorage.getItem("lessorSignatureUrl") || ""
  );
  const localStorageLesseeSignUrl = JSON.parse(
    localStorage.getItem("lesseeSignatureUrl") || ""
  );
  console.log(localStorageLesseeSignUrl);
  const localStorageLessorValue = JSON.parse(
    localStorage.getItem("lessorFormValues") || ""
  );
  const localStorageLesseeValue = JSON.parse(
    localStorage.getItem("lesseeFormValues") || ""
  );

  return (
    <>
      <AgreementWrapper
        title="Lease Agreement"
        nextButtonText="Sign Now"
        nextButtonHref="/tenantLeaseAgreementForm"
      >
        <AgreementTerm number="17" title="no partnership">
          {TermSeventeen()}
        </AgreementTerm>
        <AgreementTerm number="18" title="SUCCESSORS BOUND ">
          {TermEighteen(
            localStorageLessorSignUrl,
            localStorageLessorValue.lessorDesignation,
            localStorageLessorValue.lessorIc
          )}
        </AgreementTerm>
      </AgreementWrapper>
    </>
  );
};

export default TenantAgreementPage3;
