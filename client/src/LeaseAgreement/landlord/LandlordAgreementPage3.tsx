import { lessorSignatureUrl } from "@/component/AgreementComponents/agreement-signals";
import axios from "axios";
import { AgreementTerm } from "component/AgreementComponents/agreeement-term";
import { AgreementWrapper } from "component/AgreementComponents/agreement-wrapper";
import { TermEighteen, TermSeventeen } from "LeaseAgreement/AgreementText";

const LandlordAgreementPage3 = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/leaseAgreement/getLeaseAgreement"
  );
  const data = response.data;

  const dialogLandlordText = `Your Lease Agreement had been submitted to the system and sent to your tenant, please be patient to wait for him/her to check and sign for this lease agreement, you might track your lease agreement status at ${(
    <a href="/landlordApplicant">applicant page</a>
  )}.`;

  return (
    <>
      <AgreementWrapper
        title="Lease Agreement"
        dialogCloseText="OK"
        dialogDescription={dialogLandlordText}
        dialogTitle="Submitted Successfully"
        dialogTriggerText="Save and Submit"
        landlordLastPage={true}
      >
        <AgreementTerm number="17" title="no partnership">
          {TermSeventeen()}
        </AgreementTerm>
        <AgreementTerm number="18" title="SUCCESSORS BOUND ">
          {TermEighteen(
            data.lessorSignature,
            data.lessorDesignation,
            data.lessorIc
          )}
        </AgreementTerm>
      </AgreementWrapper>
    </>
  );
};

export default LandlordAgreementPage3;
